import pizza from "@/static/pizza.json";
import {
  normalizeDough,
  normalizeIngredient,
  normalizeSize,
  normalizeSauce,
} from "@/common/helpers";
import {
  SET_PIZZA_NAME,
  SET_PIZZA_DOUGH,
  SET_PIZZA_SIZE,
  SET_PIZZA_SAUCE,
  SET_PIZZA_INGREDIENT,
  MOVE_PIZZA_INGREDIENT,
  UPDATE_PIZZA,
} from "@/store/mutations-types";

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
    [SET_PIZZA_NAME](state, name) {
      state.pizza.name = name;
    },
    [SET_PIZZA_DOUGH](state, dough) {
      state.pizza.dough = dough;
    },
    [SET_PIZZA_SIZE](state, size) {
      state.pizza.size = size;
    },
    [SET_PIZZA_SAUCE](state, sauce) {
      state.pizza.sauce = sauce;
    },
    [SET_PIZZA_INGREDIENT](state, { ingredient, count }) {
      const ingredients = [...state.pizza.ingredients];
      const index = ingredients.findIndex(({ id }) => id === ingredient.id);

      if (count > 0) {
        ~index
          ? (ingredients[index].count = count)
          : ingredients.push({ ...ingredient, count });
      } else {
        ingredients.splice(index, 1);
      }

      state.pizza.ingredients = ingredients;
    },
    [MOVE_PIZZA_INGREDIENT](state, ingredient) {
      const ingredients = [...state.pizza.ingredients];
      const index = ingredients.findIndex(({ id }) => id === ingredient.id);

      ~index
        ? (ingredients[index].count = ingredients[index].count + 1)
        : ingredients.push({ ...ingredient, count: 1 });

      state.pizza.ingredients = ingredients;
    },
  },
};
