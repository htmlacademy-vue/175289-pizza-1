<template>
  <li class="cart-list__item">
    <div class="product cart-list__product">
      <img
        src="@/assets/img/product.svg"
        class="product__img"
        width="56"
        height="56"
        alt="Капричоза"
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

    <!-- ToDo -->
    <div class="cart-list__button">
      <button type="button" class="cart-list__edit">Изменить</button>
    </div>
  </li>
</template>

<script>
import { mapActions } from "vuex";
import { formatPrice } from "@/common/helpers";

export default {
  name: "CartList",
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
  },
};
</script>
