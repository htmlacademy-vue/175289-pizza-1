<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>

      <div class="sheet__content diameter">
        <label
          v-for="size in sizes"
          :key="size.name"
          class="diameter__input"
          :class="`diameter__input--${size.value}`"
        >
          <input
            class="visually-hidden"
            type="radio"
            name="diameter"
            :value="size.value"
            :checked="size === selectedSize"
            @change="$emit('change-size', size)"
          />
          <span>{{ size.name }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "BuilderSizeSelector",
  computed: {
    ...mapState("Builder", ["sizes"]),
    ...mapGetters("Builder", ["selectedSize"]),
  },
};
</script>
