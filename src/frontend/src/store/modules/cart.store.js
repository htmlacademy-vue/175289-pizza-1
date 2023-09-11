import {
  ADD_ENTITY,
  UPDATE_ENTITY,
  DELETE_ENTITY,
  UPDATE_CART_DELIVERY,
  UPDATE_CART_PHONE,
  UPDATE_CART_ADDRESS,
} from "@/store/mutations-types";
import { capitalize, formatPrice } from "@/common/helpers";

const entity = "cart";
const module = capitalize(entity);

const setupState = () => ({
  pizzas: [],
  misc: [],
  delivery: "pickup",
  phone: "",
  address: {
    street: "",
    house: "",
    apartment: "",
  },
});

export default {
  namespaced: true,
  state: setupState(),
  getters: {
    miscQuantity: (state) => (id) => {
      const index = state.misc.findIndex((item) => item.id === id);

      return ~index ? state.misc[index].quantity : 0;
    },
    totalPrice: (state) => {
      const price = [...state.pizzas, ...state.misc].reduce(
        (previousValue, currentValue) => {
          return previousValue + currentValue.price * currentValue.quantity;
        },
        0
      );

      return formatPrice(price);
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
