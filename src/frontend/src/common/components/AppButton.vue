<template>
  <button class="button" type="button" :disabled="disabled" v-on="$listeners">
    <slot />
  </button>
</template>

<script>
export default {
  name: "AppButton",
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
