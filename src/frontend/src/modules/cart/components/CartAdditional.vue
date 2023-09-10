<template>
  <div class="cart__additional">
    <ul class="additional-list">
      <li
        v-for="item in misc"
        :key="item.id"
        class="additional-list__item sheet"
      >
        <p class="additional-list__description">
          <img
            :src="item.image"
            width="39"
            height="60"
            alt="Coca-Cola 0,5 литра"
          />
          <span>{{ item.name }}</span>
        </p>

        <div class="additional-list__wrapper">
          <ItemCounter
            class="additional-list__counter"
            :value="miscQuantity(item.id)"
            @change="
              updateCart({
                entity: 'misc',
                value: { ...item, quantity: $event },
              })
            "
          />

          <div class="additional-list__price">
            <b>× {{ item.price }} ₽</b>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import ItemCounter from "@/common/components/ItemCounter.vue";

export default {
  name: "CartAdditional",
  components: { ItemCounter },
  computed: {
    ...mapState("Misc", ["misc"]),
    ...mapGetters("Cart", ["miscQuantity"]),
  },
  methods: {
    ...mapActions("Cart", ["updateCart"]),
  },
};
</script>
