import { DELETE_ENTITY, SET_ENTITY } from "@/store/mutations-types";
import { capitalize } from "@/common/helpers";

const entity = "orders";
const module = capitalize(entity);

export default {
  namespaced: true,
  state: {
    orders: [],
  },
  actions: {
    async query({ commit }) {
      const data = await this.$api.orders.query();

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

    async post(context, order) {
      await this.$api.orders.post(order);
    },

    async delete({ commit }, id) {
      await this.$api.orders.delete(id);
      commit(
        DELETE_ENTITY,
        {
          module,
          entity,
          id,
        },
        { root: true }
      );
    },
  },
};
