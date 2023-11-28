import {
  SET_ENTITY,
  ADD_ENTITY,
  UPDATE_ENTITY,
  DELETE_ENTITY,
  COPY_ORDER_TO_CART,
  RESET_CART,
} from "@/store/mutations-types";
import { capitalize, formatPrice, getOrderPrice } from "@/common/helpers";

const entity = "cart";
const module = capitalize(entity);

const NEW_ADDRESS = "new address";
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
  state: { ...initialState },
  getters: {
    miscQuantity: (state) => (id) => {
      const index = state.misc.findIndex((item) => item.id === id);

      return ~index ? state.misc[index].quantity : 0;
    },
    totalPrice: (state) => {
      const price = getOrderPrice(state);
      return formatPrice(price);
    },
    isNewAddress: (state) => {
      return state.delivery === NEW_ADDRESS;
    },
    isPickup: (state) => {
      return state.delivery === PICKUP;
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
    updatePhone({ commit }, phone) {
      commit(
        SET_ENTITY,
        {
          module,
          entity: "phone",
          value: phone,
        },
        { root: true }
      );
    },
    updateDelivery({ commit }, delivery) {
      commit(
        SET_ENTITY,
        {
          module,
          entity: "delivery",
          value: delivery,
        },
        { root: true }
      );
    },
    updateAddress({ state, commit }, address) {
      commit(
        SET_ENTITY,
        {
          module,
          entity: "address",
          value: { ...state.address, ...address },
        },
        { root: true }
      );
    },
  },
  mutations: {
    [COPY_ORDER_TO_CART](state, { pizzas, misc, phone, addressId }) {
      state.pizzas = pizzas;
      state.misc = misc ?? [];
      state.phone = phone;
      if (addressId) {
        state.delivery = addressId;
      } else {
        state.delivery = PICKUP;
      }
      state.address = {
        street: "",
        building: "",
        flat: "",
      };
    },
    [RESET_CART](state) {
      for (let key in state) {
        state[key] = initialState[key];
      }
    },
  },
};
