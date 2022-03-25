import doughValues from "@/common/enums/doughValues";
import sizeValues from "@/common/enums/sizeValues";
import sauceValues from "@/common/enums/sauceValues";

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

export const normalizeSauce = (sauce) => {
  return {
    ...sauce,
    value: sauceValues[sauce.id],
  };
};
