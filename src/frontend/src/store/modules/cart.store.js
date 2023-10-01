import {
  ADD_ENTITY,
  UPDATE_ENTITY,
  DELETE_ENTITY,
  RESET_CART,
  UPDATE_CART_DELIVERY,
  UPDATE_CART_PHONE,
  UPDATE_CART_ADDRESS,
} from "@/store/mutations-types";
import { capitalize, getOrderPrice } from "@/common/helpers";

const entity = "cart";
const module = capitalize(entity);

const PICKUP = "pickup";

const initialState = {
  pizzas: [],
  misc: [],
  phone: "",
  delivery: PICKUP,
  address: {
    street: "",
    building: "",
    flat: "",
  },
};

export default {
  namespaced: true,
  state: {...initialState},
  getters: {
    miscQuantity: (state) => (id) => {
      const index = state.misc.findIndex((item) => item.id === id);

      return ~index ? state.misc[index].quantity : 0;
    },
    totalPrice: (state) => {
      return getOrderPrice(state);
    },
    showAddressFields: (state) => {
      return state.delivery !== PICKUP;
    },
  },
  actions: {
    updateCart({ state, commit }, { entity, value }) {
      const { id, quantity, ...rest } = value;
      const index = state[entity].findIndex((item) => item.id === id);

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
  mutations: {
    [RESET_CART](state) {
      for (let key in state) {
        state[key] = initialState[key];
      }
    },
    [UPDATE_CART_DELIVERY](state, delivery) {
      state.delivery = delivery;
    },
    [UPDATE_CART_PHONE](state, phone) {
      state.phone = phone;
    },
    [UPDATE_CART_ADDRESS](state, address) {
      state.address = { ...state.address, ...address };
    },
  },
};
