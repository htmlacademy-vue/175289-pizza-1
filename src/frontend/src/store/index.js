import Vue from "vue";
import Vuex from "vuex";

import Auth from "@/store/modules/auth.store";
import Builder from "@/store/modules/builder.store";
import Cart from "@/store/modules/cart.store";
import Misc from "@/store/modules/misc.store";
import Orders from "@/store/modules/orders.store";

import vuexPlugins from "@/plugins/vuexPlugins";

import {
  SET_ENTITY,
  ADD_ENTITY,
  UPDATE_ENTITY,
  DELETE_ENTITY,
} from "@/store/mutations-types";

Vue.use(Vuex);

export default new Vuex.Store({
  actions: {
    init({ dispatch }) {
      dispatch("Misc/query");
    },
  },
  mutations: {
    [SET_ENTITY](state, { module, entity, value }) {
      if (module) {
        state[module][entity] = value;
      } else {
        state[entity] = value;
      }
    },
    [ADD_ENTITY](state, { module, entity, value }) {
      if (module) {
        state[module][entity] = [...state[module][entity], value];
      } else {
        state[entity] = [...state[entity], value];
      }
    },
    [UPDATE_ENTITY](state, { module, entity, value }) {
      if (module) {
        const index = state[module][entity].findIndex(
          (el) => el.id === value.id
        );

        if (~index) {
          state[module][entity].splice(index, 1, value);
        }
      } else {
        const index = state[entity].findIndex((el) => el.id === value.id);

        if (~index) {
          state[entity].splice(index, 1, value);
        }
      }
    },
    [DELETE_ENTITY](state, { module, entity, id }) {
      if (module) {
        state[module][entity] = state[module][entity].filter(
          (el) => el.id !== id
        );
      } else {
        state[entity] = state[entity].filter((el) => el.id !== id);
      }
    },
  },
  modules: {
    Auth,
    Builder,
    Cart,
    Misc,
    Orders,
  },
  plugins: [vuexPlugins],
});
