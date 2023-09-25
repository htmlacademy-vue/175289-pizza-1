<template>
  <component
    class="button"
    :class="{
      'button--arrow': arrow,
      'button--border': border,
    }"
    :is="link ? 'router-link' : 'button'"
    :to="link ? link : null"
    :type="link ? null : type"
    :disabled="link ? null : disabled"
    exact
    v-on="$listeners"
  >
    <slot />
  </component>
</template>

<script>
export default {
  name: "AppButton",
  props: {
    arrow: {
      type: Boolean,
      default: false,
    },
    border: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    link: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "button",
    },
  },
};
</script>
