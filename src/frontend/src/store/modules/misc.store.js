import { SET_ENTITY } from "@/store/mutations-types";
import { capitalize } from "@/common/helpers";

const entity = "misc";
const module = capitalize(entity);

export default {
  namespaced: true,
  state: {
    misc: [],
  },
  actions: {
    async query({ commit }) {
      const { data } = await this.$api.misc.query();

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
