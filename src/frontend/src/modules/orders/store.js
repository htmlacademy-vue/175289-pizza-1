import { DELETE_ENTITY, SET_ENTITY } from "@/store/mutations-types";
import { capitalize, getPizzaPrice } from "@/common/helpers";

const entity = "orders";
const module = capitalize(entity);

export default {
  namespaced: true,
  state: {
    orders: [],
  },
  actions: {
    async query({ commit, rootState }) {
      const { data } = await this.$api.orders.query();

      const normalize = (order) => {
        const { addressId, id, orderPizzas, orderMisc, orderAddress, phone } =
          order;

        const normalizePizza = (pizza) => {
          const adaptPizza = {
            ...pizza,
            dough: rootState.Builder.data.dough.find(
              ({ id }) => id === pizza.doughId
            ),
            ingredients: pizza.ingredients.map(
              ({ ingredientId, quantity }) => ({
                ...rootState.Builder.data.ingredients.find(
                  ({ id }) => id === ingredientId
                ),
                quantity,
              })
            ),
            sauce: rootState.Builder.data.sauces.find(
              ({ id }) => id === pizza.sauceId
            ),
            size: rootState.Builder.data.sizes.find(
              ({ id }) => id === pizza.sizeId
            ),
          };

          adaptPizza.price = getPizzaPrice(adaptPizza);

          delete adaptPizza.doughId;
          delete adaptPizza.sauceId;
          delete adaptPizza.sizeId;

          return adaptPizza;
        };

        const normalizeMisc = (misc) => ({
          ...rootState.Misc.misc.find(({ id }) => id === misc.miscId),
          quantity: misc.quantity,
        });

        const adaptOrder = {
          addressId,
          id,
          pizzas: orderPizzas.map(normalizePizza),
          misc: orderMisc?.map(normalizeMisc),
          address: orderAddress,
          phone,
        };

        if (!adaptOrder.misc) {
          delete adaptOrder.misc;
        }

        if (!adaptOrder.address) {
          delete adaptOrder.address;
        }

        return adaptOrder;
      };

      commit(
        SET_ENTITY,
        {
          module,
          entity,
          value: data.map(normalize),
        },
        { root: true }
      );
    },

    async post(context, order) {
      const normalize = (order) => {
        const { userId, phone, address, pizzas, misc } = order;

        const normalizePizza = (pizza) => ({
          name: pizza.name,
          sauceId: pizza.sauce.id,
          doughId: pizza.dough.id,
          sizeId: pizza.size.id,
          quantity: pizza.quantity,
          ingredients: pizza.ingredients.map(({ id, quantity }) => ({
            ingredientId: id,
            quantity,
          })),
        });

        const normalizeMisc = ({ id, quantity }) => ({
          miscId: id,
          quantity,
        });

        return {
          userId,
          phone,
          address,
          pizzas: pizzas.map(normalizePizza),
          misc: misc.map(normalizeMisc),
        };
      };

      await this.$api.orders.post(normalize(order));
    },

    async delete({ commit }, id) {
      await this.$api.orders.delete(id);
      commit(
        DELETE_ENTITY,
        {
          module,
          entity,
          id,
        },
        { root: true }
      );
    },
  },
};
