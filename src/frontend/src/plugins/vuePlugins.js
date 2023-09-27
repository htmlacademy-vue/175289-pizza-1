import Vue from "vue";
import jwtService from "@/services/jwt.service";
import { createResources } from "@/common/helpers";

const plugins = {
  install(Vue) {
    Vue.mixin({
      computed: {
        $api: () => createResources(),
        $jwt: () => jwtService,
      },
    });
  },
};

Vue.use(plugins);
