<template>
  <div
    :class="`pizza pizza--foundation--${pizza.dough.value}-${pizza.sauce.value}`"
  >
    <div class="pizza__wrapper">
      <transition-group name="pizza-layer">
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
      </transition-group>
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

<style scoped>
.pizza-layer-enter,
.pizza-layer-leave-to {
  opacity: 0;
  transform: scale(1.2);
}
.pizza-layer-enter-active,
.pizza-layer-leave-active {
  transition-property: opacity, transform;
  transition-duration: 0.5s;
  transition-timing-function: ease;
}
.pizza-layer-leave-active {
  transition-duration: 0.2s;
}
</style>
