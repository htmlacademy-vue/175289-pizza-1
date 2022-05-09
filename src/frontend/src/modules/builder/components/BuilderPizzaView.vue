<template>
  <div
    :class="`pizza pizza--foundation--${pizza.dough.value}-${pizza.sauce.value}`"
  >
    <div class="pizza__wrapper">
      <template v-for="ingredient in pizza.ingredients">
        <div
          v-for="count in ingredient.count"
          :key="`${ingredient.value}-layer-${count}`"
          :class="[
            'pizza__filling',
            `pizza__filling--${ingredient.value}`,
            { 'pizza__filling--second': count === 2 },
            { 'pizza__filling--third': count === 3 },
          ]"
        />
      </template>
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
