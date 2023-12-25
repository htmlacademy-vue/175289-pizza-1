<template>
  <ul class="cart-list sheet">
    <CartListItem
      v-for="pizza in pizzas"
      :key="pizza.id"
      :pizza="pizza"
      data-test="item"
    />
  </ul>
</template>

<script>
import { mapState } from "vuex";
import CartListItem from "@/modules/cart/components/CartListItem.vue";

export default {
  name: "CartList",
  components: { CartListItem },
  computed: {
    ...mapState("Cart", ["pizzas"]),
  },
};
</script>
