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

export const createResources = () => {
  return {
    [resources.AUTH]: new AuthApiService(),
    [resources.ADDRESSES]: new CrudApiService(resources.ADDRESSES),
    [resources.DOUGH]: new ReadOnlyApiService(resources.DOUGH),
    [resources.INGREDIENTS]: new ReadOnlyApiService(resources.INGREDIENTS),
    [resources.MISC]: new ReadOnlyApiService(resources.MISC),
    [resources.ORDERS]: new CrudApiService(resources.ORDERS),
    [resources.SAUCES]: new ReadOnlyApiService(resources.SAUCES),
    [resources.SIZES]: new ReadOnlyApiService(resources.SIZES),
  };
};

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
