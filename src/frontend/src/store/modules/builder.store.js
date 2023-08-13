import pizza from "@/static/pizza.json";
import {
  normalizeDough,
  normalizeIngredient,
  normalizeSize,
  normalizeSauce,
} from "@/common/helpers";

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
};
