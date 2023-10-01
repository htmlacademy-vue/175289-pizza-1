<template>
  <div
    :class="`pizza pizza--foundation--${pizza.dough.value}-${pizza.sauce.value}`"
  >
    <div class="pizza__wrapper">
      <template v-for="ingredient in pizza.ingredients">
        <div
          v-for="quantity in ingredient.quantity"
          :key="`${ingredient.value}-layer-${quantity}`"
          :class="[
            'pizza__filling',
            `pizza__filling--${ingredient.value}`,
            { 'pizza__filling--second': quantity === 2 },
            { 'pizza__filling--third': quantity === 3 },
          ]"
        />
      </template>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "BuilderPizzaView",
  computed: {
    ...mapState("Builder", ["pizza"]),
  },
};
</script>
