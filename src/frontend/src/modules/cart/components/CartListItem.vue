<template>
  <li class="cart-list__item">
    <div class="product cart-list__product">
      <img
        class="product__img"
        src="@/assets/img/product.svg"
        :alt="pizza.size.name"
        width="56"
        height="56"
      />
      <div class="product__text">
        <h2>{{ pizza.name }}</h2>
        <ul>
          <li>
            {{ pizza.size.name }}, на
            {{ pizza.dough.name.toLowerCase().replace(/.$/, "м") }} тесте
          </li>
          <li>Соус: {{ pizza.sauce.name.toLowerCase() }}</li>
          <li>
            Начинка:
            {{
              pizza.ingredients
                .reduce((prev, next) => [...prev, next.name.toLowerCase()], [])
                .join(", ")
            }}
          </li>
        </ul>
      </div>
    </div>

    <AppCounter
      class="cart-list__counter"
      :value="pizza.quantity"
      orange
      data-test="item-counter"
      @change="
        updateCart({
          entity: 'pizzas',
          value: { ...pizza, quantity: $event },
        })
      "
    />

    <div class="cart-list__price">
      <b>{{ price }} ₽</b>
    </div>

    <div class="cart-list__button">
      <button
        class="cart-list__edit"
        type="button"
        data-test="change-button"
        @click="change"
      >
        Изменить
      </button>
    </div>
  </li>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import { UPDATE_PIZZA } from "@/store/mutations-types";
import { AppRoute } from "@/common/constants";
import { formatPrice } from "@/common/helpers";

export default {
  name: "CartListItem",
  props: {
    pizza: {
      type: Object,
      required: true,
    },
  },
  computed: {
    price() {
      return formatPrice(this.pizza.price);
    },
  },
  methods: {
    ...mapActions("Cart", ["updateCart"]),
    ...mapMutations("Builder", {
      updatePizza: UPDATE_PIZZA,
    }),
    change() {
      this.updatePizza(this.pizza);
      this.$router.push(AppRoute.MAIN);
    },
  },
};
</script>
