<template>
  <div>
    <div class="layout__title">
      <h1 class="title title--big">История заказов</h1>
    </div>

    <OrderItem
      v-for="order in orders"
      :key="order.id"
      :order="order"
      data-test="order"
      @delete="deleteOrder"
      @repeat="repeatOrder"
    />
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import { COPY_ORDER_TO_CART } from "@/store/mutations-types";
import { AppRoute } from "@/common/constants";
import { auth } from "@/middlewares";
import OrderItem from "@/modules/orders/components/OrderItem.vue";

export default {
  name: "OrdersPage",
  layout: "AppLayoutSidebar",
  middlewares: [auth],
  components: {
    OrderItem,
  },
  computed: {
    ...mapState("Orders", ["orders"]),
  },
  created() {
    this.query();
  },
  methods: {
    ...mapActions("Orders", ["query", "delete"]),
    ...mapMutations("Cart", {
      copyOrderToCart: COPY_ORDER_TO_CART,
    }),
    deleteOrder(id) {
      this.delete(id);
    },
    repeatOrder(order) {
      this.copyOrderToCart(order);
      this.$router.push(AppRoute.CART);
    },
  },
};
</script>
