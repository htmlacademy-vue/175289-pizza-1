<template>
  <label class="radio">
    <input type="radio" :name="name" :value="value" :checked="isChecked" />
    <span>{{ text }}</span>
  </label>
</template>

<script>
export default {
  name: "AppRadioButton",
  props: {
    name: {
      type: String,
      required: true,
    },

    text: {
      type: String,
      required: true,
    },

    value: {
      type: String,
      required: true,
    },

    isChecked: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
