<template>
  <form class="layout-form" @submit.prevent="onSubmit">
    <router-view />

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
import { mapState, mapGetters } from "vuex";
import CartList from "@/modules/cart/components/CartList.vue";
import CartAdditional from "@/modules/cart/components/CartAdditional.vue";
import CartForm from "@/modules/cart/components/CartForm.vue";
import { AppRoute } from "@/common/constants";

export default {
  name: "CartPage",
  components: { CartList, CartAdditional, CartForm },
  computed: {
    ...mapState("Cart", ["pizzas"]),
    ...mapGetters("Cart", ["totalPrice", "showAddressFields"]),
    notEmpty() {
      return this.pizzas?.length > 0;
    },
  },
  methods: {
    onSubmit() {
      const form = this.$refs.form;

      // Валидируем форму корзины
      const fields = this.showAddressFields
        ? { phone: this.phone, street: this.address.street, building: this.address.building }
        : { phone: this.phone };

      if (!form.$validateFields(fields, form.validations)) {
        return;
      }

      this.$router.push(AppRoute.THANKS);
    },
  },
};
</script>
