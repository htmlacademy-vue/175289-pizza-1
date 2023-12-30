import { SET_ENTITY } from "@/store/mutations-types";
import { capitalize } from "@/common/helpers";

const entity = "auth";
const module = capitalize(entity);

export default {
  namespaced: true,
  state: {
    user: null,
    isAuthenticated: false,
  },
  actions: {
    async login({ dispatch }, credentials) {
      const { data } = await this.$api.auth.login(credentials);

      this.$jwt.setToken(data.token);
      this.$api.auth.setAuthHeader();

      dispatch("getMe");
    },

    async logout({ commit }, sendRequest = true) {
      if (sendRequest) {
        await this.$api.auth.logout();
      }

      this.$jwt.destroyToken();
      this.$api.auth.setAuthHeader();

      commit(
        SET_ENTITY,
        { module, entity: "user", value: null },
        { root: true }
      );
      commit(
        SET_ENTITY,
        { module, entity: "isAuthenticated", value: false },
        { root: true }
      );
    },

    async getMe({ commit, dispatch }) {
      try {
        const { data } = await this.$api.auth.getMe();

        commit(
          SET_ENTITY,
          { module, entity: "user", value: data },
          { root: true }
        );
        commit(
          SET_ENTITY,
          { module, entity: "isAuthenticated", value: true },
          { root: true }
        );
      } catch {
        dispatch("logout", false);
      }
    },
  },
};
