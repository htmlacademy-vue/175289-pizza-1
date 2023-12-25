<template>
  <div v-if="notifications.length" class="notification__wrapper">
    <div
      v-for="({ text, type }, i) in notifications"
      :key="i"
      class="notification"
      :class="`notification--${type}`"
    >
      <span>{{ text }}</span>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "AppNotifications",
  computed: {
    ...mapState(["notifications"]),
  },
};
</script>

<style lang="scss" scoped>
.notification {
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  padding: 20px;

  text-align: center;

  color: $white;
  border-bottom: 2px solid transparent;

  &__wrapper {
    position: fixed;
    z-index: 9999;
    top: 0;
    left: 50%;

    width: 420px;
    padding: 10px;
    transform: translateX(-50%);
  }

  &--error {
    background: $red-800;
    border-color: $red-900;
  }

  &--success {
    background: $green-300;
    border-color: $green-600;
  }
}
</style>
