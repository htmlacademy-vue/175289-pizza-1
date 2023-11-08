<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>

      <div class="sheet__content diameter">
        <label
          v-for="size in data.sizes"
          :key="size.name"
          class="diameter__input"
          :class="`diameter__input--${size.value}`"
        >
          <input
            class="visually-hidden"
            type="radio"
            name="diameter"
            :value="size.value"
            :checked="size.id === selectedSize.id"
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
    ...mapState("Builder", ["data"]),
    ...mapGetters("Builder", ["selectedSize"]),
  },
};
</script>
