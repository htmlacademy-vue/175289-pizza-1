import {
  capitalize,
  getPizzaPrice,
  normalizeDough,
  normalizeIngredient,
  normalizeSize,
  normalizeSauce,
} from "@/common/helpers";
import {
  SET_ENTITY,
  RESET_BUILDER,
  UPDATE_PIZZA,
} from "@/store/mutations-types";

const entity = "builder";
const module = capitalize(entity);

const initialPizzaName = "";
const initialSelectedDoughIndex = 0;
const initialSelectedSizeIndex = 1;
const initialSelectedSauceIndex = 0;

export default {
  namespaced: true,
  state: {
    data: {
      dough: [],
      ingredients: [],
      sizes: [],
      sauces: [],
    },
    pizza: {
      name: initialPizzaName,
      dough: {},
      size: {},
      sauce: {},
      ingredients: [],
    },
  },
  getters: {
    getIngredientQuantity: (state, getters) => (ingredientId) => {
      const result = getters.selectedIngredients.reduce(
        (accumulator, { id, quantity }) => ({
          ...accumulator,
          [id]: quantity,
        }),
        {}
      );

      return result[ingredientId] || 0;
    },
    getPrice: (state) => {
      return getPizzaPrice(state.pizza);
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
        dough: normalizeDough(dough.at(initialSelectedDoughIndex)),
        size: normalizeIngredient(sizes.at(initialSelectedSizeIndex)),
        sauce: normalizeSauce(sauces.at(initialSelectedSauceIndex)),
      });
    },
  },
  mutations: {
    [RESET_BUILDER](state) {
      state.pizza = {
        name: initialPizzaName,
        dough: state.data.dough.at(initialSelectedDoughIndex),
        size: state.data.sizes.at(initialSelectedSizeIndex),
        sauce: state.data.sauces.at(initialSelectedSauceIndex),
        ingredients: [],
      };
    },
    [UPDATE_PIZZA](state, value) {
      state.pizza = {
        ...state.pizza,
        ...value,
      };
    },
  },
};
