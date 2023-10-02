import { ADD_ENTITY, SET_ENTITY, UPDATE_ENTITY } from "@/store/mutations-types";
import { capitalize } from "@/common/helpers";

const entity = "addresses";
const module = capitalize(entity);

export default {
  namespaced: true,
  state: {
    addresses: [],
  },
  actions: {
    async query({ commit }) {
      const { data } = await this.$api.addresses.query();

      commit(
        SET_ENTITY,
        {
          module,
          entity,
          value: data,
        },
        { root: true }
      );
    },
    async post({ commit }, address) {
      const { data } = await this.$api.addresses.post(address);

      commit(
        ADD_ENTITY,
        {
          entity,
          module,
          value: data,
        },
        { root: true }
      );
    },
    async put({ commit }, address) {
      await this.$api.addresses.put(address);

      commit(
        UPDATE_ENTITY,
        {
          entity,
          module,
          value: address,
        },
        { root: true }
      );
    },
  },
};
