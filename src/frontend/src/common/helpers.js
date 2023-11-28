import {
  AuthApiService,
  ReadOnlyApiService,
  CrudApiService,
} from "@/services/api.service";
import resources from "@/common/enums/resources";
import doughValues from "@/common/enums/doughValues";
import ingredientValues from "@/common/enums/ingredientValues";
import sizeValues from "@/common/enums/sizeValues";
import sauceValues from "@/common/enums/sauceValues";

export const createResources = (notifier) => {
  return {
    [resources.AUTH]: new AuthApiService(notifier),
    [resources.ADDRESSES]: new CrudApiService(resources.ADDRESSES, notifier),
    [resources.DOUGH]: new ReadOnlyApiService(resources.DOUGH, notifier),
    [resources.INGREDIENTS]: new ReadOnlyApiService(
      resources.INGREDIENTS,
      notifier
    ),
    [resources.MISC]: new ReadOnlyApiService(resources.MISC, notifier),
    [resources.ORDERS]: new CrudApiService(resources.ORDERS, notifier),
    [resources.SAUCES]: new ReadOnlyApiService(resources.SAUCES, notifier),
    [resources.SIZES]: new ReadOnlyApiService(resources.SIZES, notifier),
  };
};

export const capitalize = (string) => {
  return `${string.charAt(0).toUpperCase()}${string.slice(1)}`;
};

export const formatPrice = (number) => {
  return number.toLocaleString("ru-Ru");
};

export const getPizzaPrice = (pizza) => {
  const { size, dough, sauce, ingredients } = pizza;
  const ingredientsPrice = ingredients.reduce(
    (accumulator, { price, quantity }) => accumulator + price * quantity,
    0
  );

  return size.multiplier * (dough.price + sauce.price + ingredientsPrice);
};

export const getOrderPrice = ({ pizzas, misc = [] }) => {
  const price = [...pizzas, ...misc].reduce((acc, { price, quantity }) => {
    return acc + price * quantity;
  }, 0);

  return formatPrice(price);
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
