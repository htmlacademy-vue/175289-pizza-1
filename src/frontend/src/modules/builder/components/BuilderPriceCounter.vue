<template>
  <p>Итого: {{ price }} ₽</p>
</template>

<script>
export default {
  name: "BuilderPriceCounter",
  props: {
    pizza: {
      type: Object,
      required: true,
    },
  },
  computed: {
    price() {
      const { size, dough, sauce, ingredients } = this.pizza;
      const ingredientsPrice = ingredients.reduce(
        (accumulator, { price, count }) => accumulator + price * count,
        0
      );

      return size.multiplier * (dough.price + sauce.price + ingredientsPrice);
    },
  },
};
</script>
