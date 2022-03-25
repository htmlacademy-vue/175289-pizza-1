import doughValues from "@/common/enums/doughValues";
import sizeValues from "@/common/enums/sizeValues";

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
