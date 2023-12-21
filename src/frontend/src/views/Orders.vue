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
import { mapMutations } from "vuex";
import { COPY_ORDER_TO_CART } from "@/store/mutations-types";
import { AppRoute } from "@/common/constants";
import OrderItem from "@/modules/orders/components/OrderItem.vue";
import { mapState, mapActions } from "vuex";

export default {
  name: "OrdersPage",
  layout: "AppLayoutSidebar",
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
