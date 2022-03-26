<template>
  <button class="button" type="button" :disabled="isDisabled">
    <slot />
  </button>
</template>

<script>
export default {
  name: "AppButton",
  props: {
    isDisabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
