<template>
  <div id="app">
    <AppLayout
      :doughs="doughs"
      :ingredients="ingredients"
      :sizes="sizes"
      :sauces="sauces"
    />
  </div>
</template>

<script>
import pizza from "@/static/pizza.json";
import {
  normalizeDough,
  normalizeIngredient,
  normalizeSize,
  normalizeSauce,
} from "@/common/helpers";
import AppLayout from "@/layouts/AppLayout";

export default {
  name: "App",
  components: { AppLayout },
  data() {
    return {
      doughs: pizza.dough.map(normalizeDough),
      ingredients: pizza.ingredients.map(normalizeIngredient),
      sizes: pizza.sizes.map(normalizeSize),
      sauces: pizza.sauces.map(normalizeSauce),
    };
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
