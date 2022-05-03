<template>
  <div
    :class="`pizza pizza--foundation--${pizza.dough.value}-${pizza.sauce.value}`"
  >
    <div class="pizza__wrapper">
      <div
        v-for="ingredient in pizza.ingredients"
        :key="ingredient.value"
        :class="[
          'pizza__filling',
          `pizza__filling--${ingredient.value}`,
          { 'pizza__filling--second': ingredient.count === 2 },
          { 'pizza__filling--third': ingredient.count === 3 },
        ]"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "BuilderPizzaView",
  props: {
    pizza: {
      type: Object,
      required: true,
    },
  },
};
</script>
