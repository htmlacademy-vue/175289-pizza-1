<template>
  <div id="app">
    <AppLayoutHeader />
    <IndexPage />
  </div>
</template>

<script>
import AppLayoutHeader from "./layouts/AppLayoutHeader";
import IndexPage from "@/views/Index.vue";

export default {
  name: "App",
  components: {
    AppLayoutHeader,
    IndexPage,
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
