import pizza from "@/static/pizza.json";
import {
  normalizeDough,
  normalizeIngredient,
  normalizeSize,
  normalizeSauce,
} from "@/common/helpers";
import { UPDATE_PIZZA } from "@/store/mutations-types";

const setupState = () => {
  const doughs = pizza.dough.map(normalizeDough);
  const ingredients = pizza.ingredients.map(normalizeIngredient);
  const sizes = pizza.sizes.map(normalizeSize);
  const sauces = pizza.sauces.map(normalizeSauce);

  return {
    doughs,
    ingredients,
    sizes,
    sauces,

    pizza: {
      name: "",
      dough: doughs[0],
      size: sizes[1],
      sauce: sauces[0],
      ingredients: [],
    },
  };
};

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
  mutations: {
    [UPDATE_PIZZA](state, value) {
      state.pizza = {
        ...state.pizza,
        ...value,
      };
    },
  },
};
