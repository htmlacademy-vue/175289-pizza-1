import doughValues from "@/common/enums/doughValues";

export const normalizeDough = (dough) => {
  return {
    ...dough,
    value: doughValues[dough.id],
  };
};
