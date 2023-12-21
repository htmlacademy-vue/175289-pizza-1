import Vue from "vue";
import App from "@/App.vue";
import store from "@/store";
import "@/plugins/ui";
import "@/plugins/vuePlugins";

Vue.config.productionTip = false;

const init = async () => {
  const routerModule = await import("@/router");
  const router = await routerModule.default;

  new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount("#app");
};

init();
