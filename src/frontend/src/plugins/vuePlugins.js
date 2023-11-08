import Vue from "vue";
import store from "@/store";
import jwtService from "@/services/jwt.service";
import Notifier from "@/plugins/notifier";
import { createResources } from "@/common/helpers";

const plugins = {
  install(Vue) {
    Vue.mixin({
      computed: {
        $notifier: () => new Notifier(store),
        $api() {
          return createResources(this.$notifier);
        },
        $jwt: () => jwtService,
      },
    });
  },
};

Vue.use(plugins);
