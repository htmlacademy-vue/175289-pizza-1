<template>
  <div id="app">
    <AppNotifications />

    <AppLayout>
      <transition
        name="view"
        :appear="appear"
        enter-active-class="animate__animated animate__slideInLeft"
      >
        <router-view />
      </transition>
    </AppLayout>
  </div>
</template>

<script>
import AppLayout from "@/layouts/AppLayout";
import { AppRoute } from "@/common/constants";
import "animate.css";

export default {
  name: "App",
  components: { AppLayout },
  created() {
    this.$store.dispatch("init");
  },
  computed: {
    appear() {
      return this.$route.path !== AppRoute.LOGIN;
    },
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
