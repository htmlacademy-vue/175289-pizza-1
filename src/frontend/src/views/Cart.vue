<template>
  <form class="layout-form" data-test="layout-form" @submit.prevent="onSubmit">
    <PopupTransition>
      <CartPopup
        v-if="isPopupDisplayed"
        data-test="popup"
        @close="onPopupClose"
      />
    </PopupTransition>

    <main class="content cart">
      <div class="container">
        <div class="cart__title">
          <h1 class="title title--big">Корзина</h1>
        </div>

        <template v-if="notEmpty">
          <CartList />
          <CartAdditional />
          <CartForm ref="form" data-test="cart-form" />
        </template>

        <div v-else class="sheet cart__empty" data-test="empty-cart-text">
          <p>В корзине нет ни одного товара</p>
        </div>
      </div>
    </main>
    <section v-if="notEmpty" class="footer">
      <div class="footer__more">
        <AppButton link="/" arrow border>Хочу еще одну</AppButton>
      </div>
      <p class="footer__text">
        Перейти к конструктору<br />чтоб собрать ещё одну пиццу
      </p>
      <div class="footer__price">
        <b>Итого: {{ totalPrice }} ₽</b>
      </div>

      <div class="footer__submit">
        <AppButton type="submit">Оформить заказ</AppButton>
      </div>
    </section>
  </form>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import { AppRoute, LEAVE_ANIMATION_DURATION } from "@/common/constants";
import { RESET_BUILDER, RESET_CART } from "@/store/mutations-types";
import CartList from "@/modules/cart/components/CartList.vue";
import CartAdditional from "@/modules/cart/components/CartAdditional.vue";
import CartForm from "@/modules/cart/components/CartForm.vue";
import CartPopup from "@/modules/cart/components/CartPopup.vue";
import PopupTransition from "@/common/components/PopupTransition.vue";

export default {
  name: "CartPage",
  components: {
    CartList,
    CartAdditional,
    CartForm,
    CartPopup,
    PopupTransition,
  },
  data() {
    return {
      isPopupDisplayed: false,
    };
  },
  computed: {
    ...mapState("Auth", ["user", "isAuthenticated"]),
    ...mapState("Cart", ["pizzas", "misc", "phone", "delivery", "address"]),
    ...mapGetters("Cart", ["totalPrice", "isNewAddress", "isPickup"]),
    notEmpty() {
      return this.pizzas?.length > 0;
    },
  },
  methods: {
    ...mapActions("Orders", ["post"]),
    ...mapMutations("Builder", {
      resetBuilder: RESET_BUILDER,
    }),
    ...mapMutations("Cart", {
      resetCart: RESET_CART,
    }),
    onPopupClose() {
      this.hidePopup();
      setTimeout(() => {
        this.$router.push(
          this.isAuthenticated ? AppRoute.ORDERS : AppRoute.MAIN
        );
      }, LEAVE_ANIMATION_DURATION);
    },
    onSubmit() {
      if (this.isFormValid()) {
        this.createNewOrder();
      }
    },
    isFormValid() {
      const form = this.$refs.form;

      const fields = this.isNewAddress
        ? {
            phone: this.phone,
            street: this.address.street,
            building: this.address.building,
          }
        : { phone: this.phone };

      return form.$validateFields(fields, form.validations);
    },
    createNewOrder() {
      this.post(this.getOrderData()).then(() => {
        this.getAddresses();
        this.showPopup();
        this.reset();
      });
    },
    getOrderData() {
      return {
        userId: this.isAuthenticated ? this.user.id : null,
        phone: this.phone,
        address: this.isPickup
          ? null
          : this.isNewAddress
          ? { ...this.address }
          : { id: this.delivery },
        pizzas: this.pizzas,
        misc: this.misc,
      };
    },
    getAddresses() {
      if (this.isAuthenticated && this.isNewAddress) {
        this.$store.dispatch("Addresses/query");
      }
    },
    showPopup() {
      this.isPopupDisplayed = true;
    },
    hidePopup() {
      this.isPopupDisplayed = false;
    },
    reset() {
      this.resetBuilder();
      this.resetCart();
    },
  },
};
</script>
