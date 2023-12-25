import doughValues from "@/common/enums/doughValues";
import ingredientValues from "@/common/enums/ingredientValues";
import sizeValues from "@/common/enums/sizeValues";
import sauceValues from "@/common/enums/sauceValues";
import resources from "@/common/enums/resources";
import {
  AuthApiService,
  ReadOnlyApiService,
  CrudApiService,
} from "@/services/api.service";
import { SET_ENTITY } from "@/store/mutations-types";
import addresses from "@/store/mocks/data/addresses";
import builder from "@/store/mocks/data/builder";
import pizzas from "@/store/mocks/data/pizzas";
import user from "@/store/mocks/data/user";

export const capitalize = (string) => {
  return `${string.charAt(0).toUpperCase()}${string.slice(1)}`;
};

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

export const formatPrice = (number) => {
  return Math.round(number).toLocaleString("ru-Ru");
};

export const getOrderPrice = ({ pizzas, misc = [] }) => {
  const price = [...pizzas, ...misc].reduce((acc, { price, quantity }) => {
    return acc + price * quantity;
  }, 0);

  return price;
};

export const getPizzaPrice = (pizza) => {
  const { size, dough, sauce, ingredients } = pizza;
  const ingredientsPrice = ingredients.reduce(
    (accumulator, { price, quantity }) => accumulator + price * quantity,
    0
  );

  return size.multiplier * (dough.price + sauce.price + ingredientsPrice);
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

export const setAddresses = (store) => {
  store.commit(
    SET_ENTITY,
    {
      module: "Addresses",
      entity: "addresses",
      value: addresses,
    },
    { root: true }
  );
};

export const setBuilderData = (store) => {
  store.commit(
    SET_ENTITY,
    {
      module: "Builder",
      entity: "data",
      value: {
        dough: builder.dough,
        ingredients: builder.ingredients,
        sauces: builder.sauces,
        sizes: builder.sizes,
      },
    },
    { root: true }
  );
};

export const setBuilderPizza = (store) => {
  store.commit(
    SET_ENTITY,
    {
      module: "Builder",
      entity: "pizza",
      value: pizzas[0],
    },
    { root: true }
  );
};

export const setUser = (store) => {
  store.commit(
    SET_ENTITY,
    {
      module: "Auth",
      entity: "user",
      value: user,
    },
    { root: true }
  );
  store.commit(
    SET_ENTITY,
    {
      module: "Auth",
      entity: "isAuthenticated",
      value: true,
    },
    { root: true }
  );
};
