<template>
  <div class="cart__additional">
    <ul class="additional-list">
      <li
        v-for="item in misc"
        :key="item.id"
        class="additional-list__item sheet"
        data-test="additional-item"
      >
        <p class="additional-list__description">
          <img :src="item.image" :alt="item.name" width="39" height="60" />
          <span>{{ item.name }}</span>
        </p>

        <div class="additional-list__wrapper">
          <AppCounter
            class="additional-list__counter"
            :value="miscQuantity(item.id)"
            orange
            data-test="additional-item-counter"
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

export default {
  name: "CartAdditional",
  computed: {
    ...mapState("Misc", ["misc"]),
    ...mapGetters("Cart", ["miscQuantity"]),
  },
  methods: {
    ...mapActions("Cart", ["updateCart"]),
  },
};
</script>
