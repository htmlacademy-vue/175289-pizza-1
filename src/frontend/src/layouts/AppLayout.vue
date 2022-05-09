<template>
  <div>
    <AppLayoutHeader />
    <IndexPage
      :doughs="doughs"
      :ingredients="ingredients"
      :sizes="sizes"
      :sauces="sauces"
    />
  </div>
</template>

<script>
import AppLayoutHeader from "@/layouts/AppLayoutHeader";
import IndexPage from "@/views/Index.vue";

export default {
  name: "AppLayout",
  components: { AppLayoutHeader, IndexPage },
  props: {
    doughs: {
      type: Array,
      required: true,
    },

    ingredients: {
      type: Array,
      required: true,
    },

    sizes: {
      type: Array,
      required: true,
    },

    sauces: {
      type: Array,
      required: true,
    },
  },
};
</script>
