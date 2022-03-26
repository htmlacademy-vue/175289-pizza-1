<template>
  <label class="diameter__input" :class="`diameter__input--${size.value}`">
    <input
      type="radio"
      name="diameter"
      :value="size.value"
      class="visually-hidden"
      :checked="isChecked"
    />
    <span>{{ size.name }}</span>
  </label>
</template>

<script>
export default {
  name: "BuilderSizeSelector",
  props: {
    size: {
      type: Object,
      required: true,
    },

    isChecked: {
      type: Boolean,
      required: false,
    },
  },
};
</script>
