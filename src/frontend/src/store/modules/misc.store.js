import { SET_ENTITY } from "@/store/mutations-types";
import { capitalize } from "@/common/helpers";
import misc from "@/static/misc.json";

const entity = "misc";
const module = capitalize(entity);

const setupState = () => ({
  misc: [],
});

export default {
  namespaced: true,
  state: setupState(),
  actions: {
    query({ commit }) {
      const data = misc;

      commit(
        SET_ENTITY,
        {
          module,
          entity,
          value: data,
        },
        { root: true }
      );
    },
  },
};
