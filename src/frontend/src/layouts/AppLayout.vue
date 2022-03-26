<template>
  <div>
    <AppLayoutHeader />
    <IndexPage />
  </div>
</template>

<script>
import AppLayoutHeader from "@/layouts/AppLayoutHeader";
import IndexPage from "@/views/Index.vue";

export default {
  name: "AppLayout",
  components: { AppLayoutHeader, IndexPage },
};
</script>
