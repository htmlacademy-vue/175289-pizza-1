import Vue from "vue";
import Vuex from "vuex";

import Auth from "@/store/modules/auth.store";
import Builder from "@/store/modules/builder.store";
import Cart from "@/store/modules/cart.store";
import Orders from "@/store/modules/orders.store";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Auth,
    Builder,
    Cart,
    Orders,
  },
});
