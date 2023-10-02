import { ADD_ENTITY, SET_ENTITY } from "@/store/mutations-types";
import { capitalize } from "@/common/helpers";

const entity = "addresses";
const module = capitalize(entity);

export default {
  namespaced: true,
  state: {
    addresses: [],
  },
  actions: {
    async query({ commit }) {
      const data = [
        {
          id: 1,
          name: "Тест",
          street: "Невский пр.",
          building: "д. 22",
          flat: "кв. 46",
          comment: "Позвоните, пожалуйста, от проходной",
          userId: "string",
        },
        {
          id: 2,
          name: "Тест",
          street: "Невский пр.",
          building: "д. 22",
          flat: "кв. 46",
          comment: "Позвоните, пожалуйста, от проходной",
          userId: "string",
        },
      ];

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
    async post({ commit }, address) {
      const { data } = await this.$api.addresses.post(address);

      commit(
        ADD_ENTITY,
        {
          entity,
          module,
          value: data,
        },
        { root: true }
      );
    },
  },
};
