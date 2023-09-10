import {
  ADD_ENTITY,
  UPDATE_ENTITY,
  DELETE_ENTITY,
} from "@/store/mutations-types";
import { capitalize } from "@/common/helpers";

const entity = "cart";
const module = capitalize(entity);

const setupState = () => ({
  pizzas: [],
  misc: [],
});

export default {
  namespaced: true,
  state: setupState(),
  getters: {
    miscQuantity: (state) => (id) => {
      const index = state.misc.findIndex((item) => item.id === id);

      return ~index ? state.misc[index].quantity : 0;
    },
  },
  actions: {
    updateCart({ state, commit }, { entity, value }) {
      const { id, quantity, ...rest } = value;
      const index = state.misc.findIndex((item) => item.id === id);

      if (~index) {
        if (quantity) {
          commit(
            UPDATE_ENTITY,
            {
              module,
              entity,
              value: { id, quantity, ...rest },
            },
            { root: true }
          );
        } else {
          commit(
            DELETE_ENTITY,
            {
              module,
              entity,
              id,
            },
            { root: true }
          );
        }
      } else {
        commit(
          ADD_ENTITY,
          {
            module,
            entity,
            value: { id, quantity, ...rest },
          },
          { root: true }
        );
      }
    },
  },
};
