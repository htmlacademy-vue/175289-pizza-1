import doughValues from "@/common/enums/doughValues";
import ingredientValues from "@/common/enums/ingredientValues";
import sizeValues from "@/common/enums/sizeValues";
import sauceValues from "@/common/enums/sauceValues";

export const capitalize = (string) => {
  return `${string.charAt(0).toUpperCase()}${string.slice(1)}`;
};

export const formatPrice = (number) => {
  return number.toLocaleString("ru-Ru");
};

export const normalizeDough = (dough) => {
  return {
    ...dough,
    value: doughValues[dough.id],
  };
};

export const normalizeSize = (size) => {
  return {
    ...size,
    value: sizeValues[size.id],
  };
};

export const normalizeIngredient = (ingredient) => {
  return {
    ...ingredient,
    value: ingredientValues[ingredient.id],
  };
};

export const normalizeSauce = (sauce) => {
  return {
    ...sauce,
    value: sauceValues[sauce.id],
  };
};
