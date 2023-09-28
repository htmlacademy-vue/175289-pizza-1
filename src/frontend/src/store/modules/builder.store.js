import {
  capitalize,
  normalizeDough,
  normalizeIngredient,
  normalizeSize,
  normalizeSauce,
} from "@/common/helpers";
import { SET_ENTITY, UPDATE_PIZZA } from "@/store/mutations-types";

const entity = "builder";
const module = capitalize(entity);

const setupState = () => ({
  data: {
    dough: [],
    ingredients: [],
    sizes: [],
    sauces: [],
  },
  pizza: {
    name: "",
    dough: {},
    size: {},
    sauce: {},
    ingredients: [],
  },
});

export default {
  namespaced: true,
  state: setupState(),
  getters: {
    getIngredientCount: (state, getters) => (ingredientId) => {
      const counts = getters.selectedIngredients.reduce(
        (accumulator, { id, count }) => ({
          ...accumulator,
          [id]: count,
        }),
        {}
      );

      return counts[ingredientId] || 0;
    },
    getPrice: (state) => {
      const { size, dough, sauce, ingredients } = state.pizza;
      const ingredientsPrice = ingredients.reduce(
        (accumulator, { price, count }) => accumulator + price * count,
        0
      );

      return size.multiplier * (dough.price + sauce.price + ingredientsPrice);
    },
    selectedDough: (state) => state.pizza.dough,
    selectedIngredients: (state) => state.pizza.ingredients,
    selectedSauce: (state) => state.pizza.sauce,
    selectedSize: (state) => state.pizza.size,
  },
  actions: {
    async getData({ commit }) {
      const [
        { data: dough },
        { data: ingredients },
        { data: sizes },
        { data: sauces },
      ] = await Promise.all([
        this.$api.dough.query(),
        this.$api.ingredients.query(),
        this.$api.sizes.query(),
        this.$api.sauces.query(),
      ]);

      commit(
        SET_ENTITY,
        {
          module,
          entity: "data",
          value: {
            dough: dough.map(normalizeDough),
            ingredients: ingredients.map(normalizeIngredient),
            sizes: sizes.map(normalizeSize),
            sauces: sauces.map(normalizeSauce),
          },
        },
        { root: true }
      );

      commit(UPDATE_PIZZA, {
        dough: normalizeDough(dough.at(0)),
        size: normalizeIngredient(sizes.at(1)),
        sauce: normalizeSauce(sauces.at(0)),
      });
    },
  },
  mutations: {
    [UPDATE_PIZZA](state, value) {
      state.pizza = {
        ...state.pizza,
        ...value,
      };
    },
  },
};
