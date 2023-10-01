<template>
  <div>
    <div class="layout__title">
      <h1 class="title title--big">История заказов</h1>
    </div>

    <OrderItem />

    <OrderItem />
  </div>
</template>

<script>
import OrderItem from "@/modules/orders/components/OrderItem.vue";

export default {
  name: "OrdersPage",
  components: {
    OrderItem,
  },
};
</script>
