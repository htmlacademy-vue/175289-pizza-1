<template>
  <form action="test.html" method="post" class="layout-form">
    <main class="content cart">
      <div class="container">
        <div class="cart__title">
          <h1 class="title title--big">Корзина</h1>
        </div>

        <template v-if="notEmpty">
          <CartList />
          <CartAdditional />
          <CartForm />
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

export default {
  name: "CartPage",
  components: { CartList, CartAdditional, CartForm },
  computed: {
    ...mapState("Cart", ["pizzas"]),
    ...mapGetters("Cart", ["totalPrice"]),

    notEmpty() {
      return this.pizzas?.length > 0;
    },
  },
};
</script>
