<template>
  <div>
    <div class="layout__title">
      <h1 class="title title--big">История заказов</h1>
    </div>

    <template v-if="orders">
      <OrderItem
        v-for="order in orders"
        :key="order.id"
        :order="order"
        @delete="deleteOrder"
        @repeat="repeatOrder"
      />
    </template>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { UPDATE_CART } from "@/store/mutations-types";
import { AppRoute } from "@/common/constants";
import OrderItem from "@/modules/orders/components/OrderItem.vue";

export default {
  name: "OrdersPage",
  components: {
    OrderItem,
  },
  data() {
    return {
      orders: null,
    };
  },
  created() {
    this.$api.orders.query().then((data) => {
      this.orders = data;
    });
  },
  methods: {
    ...mapMutations("Cart", {
      updateCart: UPDATE_CART,
    }),
    deleteOrder(id) {
      this.$api.orders.delete(id).then(() => {
        this.orders = this.orders.filter((order) => order.id !== id);
      });
    },
    repeatOrder(order) {
      this.updateCart(order);
      this.$router.push(AppRoute.CART);
    },
  },
};
</script>
