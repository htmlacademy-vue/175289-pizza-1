<template>
  <form class="layout-form" @submit.prevent="onSubmit">
    <CartPopup v-if="showPopup" @close="onPopupClose" />

    <main class="content cart">
      <div class="container">
        <div class="cart__title">
          <h1 class="title title--big">Корзина</h1>
        </div>

        <template v-if="notEmpty">
          <CartList />
          <CartAdditional />
          <CartForm ref="form" />
        </template>

        <div v-else class="sheet cart__empty">
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
import { mapState, mapGetters, mapMutations } from "vuex";
import { AppRoute } from "@/common/constants";
import { RESET_BUILDER, RESET_CART } from "@/store/mutations-types";
import CartList from "@/modules/cart/components/CartList.vue";
import CartAdditional from "@/modules/cart/components/CartAdditional.vue";
import CartForm from "@/modules/cart/components/CartForm.vue";
import CartPopup from "@/modules/cart/components/CartPopup.vue";

export default {
  name: "CartPage",
  components: { CartList, CartAdditional, CartForm, CartPopup },
  data() {
    return {
      showPopup: false,
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
    ...mapMutations("Builder", {
      resetBuilder: RESET_BUILDER,
    }),
    ...mapMutations("Cart", {
      resetCart: RESET_CART,
    }),
    onSubmit() {
      const form = this.$refs.form;

      // Валидируем форму корзины
      const fields = this.isNewAddress
        ? {
            phone: this.phone,
            street: this.address.street,
            building: this.address.building,
          }
        : { phone: this.phone };

      if (!form.$validateFields(fields, form.validations)) {
        return;
      }

      const address = this.isPickup
        ? null
        : this.isNewAddress
        ? { ...this.address }
        : { id: this.delivery };

      this.$api.orders
        .post({
          userId: this.isAuthenticated ? this.user.id : null,
          phone: this.phone,
          address,
          pizzas: this.pizzas,
          misc: this.misc,
        })
        .then(() => {
          this.resetBuilder();
          this.resetCart();
          this.showPopup = true;
        });
    },
    onPopupClose() {
      this.showPopup = false;
      this.$router.push(this.isAuthenticated ? AppRoute.ORDERS : AppRoute.MAIN);
    },
  },
};
</script>
