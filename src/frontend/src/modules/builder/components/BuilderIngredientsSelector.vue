<template>
  <li class="ingredients__item">
    <span class="filling" :class="`filling--${ingredient.value}`">
      {{ ingredient.name }}
    </span>
    <ItemCounter />
  </li>
</template>

<script>
import ItemCounter from "@/common/components/ItemCounter";

export default {
  name: "BuilderIngredientsSelector",
  components: { ItemCounter },
  props: {
    ingredient: {
      type: Object,
      required: true,
    },
  },
};
</script>
