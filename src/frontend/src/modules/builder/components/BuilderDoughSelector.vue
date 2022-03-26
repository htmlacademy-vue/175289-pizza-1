<template>
  <label class="dough__input" :class="`dough__input--${dough.value}`">
    <input
      type="radio"
      name="dought"
      :value="dough.value"
      class="visually-hidden"
      :checked="isChecked"
    />
    <b>{{ dough.name }}</b>
    <span>{{ dough.description }}</span>
  </label>
</template>

<script>
export default {
  name: "BuilderDoughSelector",
  props: {
    dough: {
      type: Object,
      required: true,
    },

    isChecked: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
