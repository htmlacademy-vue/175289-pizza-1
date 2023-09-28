import Vue from "vue";
import Vuex from "vuex";
import { uniqueId } from "lodash";
import modules from "@/store/modules";
import vuexPlugins from "@/plugins/vuexPlugins";
import { MESSAGE_LIVE_TIME } from "@/common/constants";
import {
  ADD_NOTIFICATION,
  DELETE_NOTIFICATION,
  SET_ENTITY,
  ADD_ENTITY,
  UPDATE_ENTITY,
  DELETE_ENTITY,
} from "@/store/mutations-types";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    notifications: [],
  },
  actions: {
    init({ dispatch }) {
      dispatch("Builder/getData");
      dispatch("Misc/query");
    },
    async createNotification({ commit }, { ...notification }) {
      const uniqueNotification = {
        ...notification,
        id: uniqueId(),
      };
      commit(ADD_NOTIFICATION, uniqueNotification);
      setTimeout(
        () => commit(DELETE_NOTIFICATION, uniqueNotification.id),
        MESSAGE_LIVE_TIME
      );
    },
  },
  mutations: {
    [ADD_NOTIFICATION](state, notification) {
      state.notifications = [...state.notifications, notification];
    },
    [DELETE_NOTIFICATION](state, id) {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== id
      );
    },
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
  modules,
  plugins: [vuexPlugins],
});
