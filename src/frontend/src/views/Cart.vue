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
        <a href="#" class="button button--border button--arrow"
          >Хочу еще одну</a
        >
      </div>
      <p class="footer__text">
        Перейти к конструктору<br />чтоб собрать ещё одну пиццу
      </p>
      <div class="footer__price">
        <b>Итого: 2 228 ₽</b>
      </div>

      <div class="footer__submit">
        <button type="submit" class="button">Оформить заказ</button>
      </div>
    </section>
  </form>
</template>

<script>
import { mapState } from "vuex";
import CartList from "@/modules/cart/components/CartList.vue";
import CartAdditional from "@/modules/cart/components/CartAdditional.vue";
import CartForm from "@/modules/cart/components/CartForm.vue";

export default {
  name: "CartPage",
  components: { CartList, CartAdditional, CartForm },
  computed: {
    ...mapState("Cart", ["pizzas"]),

    notEmpty() {
      return this.pizzas?.length > 0;
    },
  },
};
</script>
