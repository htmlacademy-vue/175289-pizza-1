import Vue from "vue";
import Vuex from "vuex";

import Auth from "@/store/modules/auth.store";
import Builder from "@/store/modules/builder.store";
import Cart from "@/store/modules/cart.store";
import Misc from "@/store/modules/misc.store";
import Orders from "@/store/modules/orders.store";
import { SET_ENTITY } from "@/store/mutations-types";

Vue.use(Vuex);

export default new Vuex.Store({
  actions: {
    init({ dispatch }) {
      dispatch("Misc/query");
    },
  },
  mutations: {
    [SET_ENTITY](state, { module, entity, value }) {
      module ? (state[module][entity] = value) : (state[entity] = value);
    },
  },
  modules: {
    Auth,
    Builder,
    Cart,
    Misc,
    Orders,
  },
});
