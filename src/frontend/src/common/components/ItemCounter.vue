<template>
  <div class="counter">
    <button
      class="counter__button counter__button--minus"
      type="button"
      :disabled="currentValue <= minValue"
      @click="decrement"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input
      class="counter__input"
      type="text"
      name="counter"
      v-model="currentValue"
      @input="setValue"
    />
    <button
      class="counter__button counter__button--plus"
      type="button"
      :disabled="currentValue >= maxValue"
      @click="increment"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>

<script>
import { MAX_INGREDIENT_COUNT } from "../constants";

export default {
  name: "ItemCounter",
  props: {
    value: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      currentValue: this.value,
      maxValue: MAX_INGREDIENT_COUNT,
      minValue: 0,
    };
  },
  methods: {
    decrement() {
      this.$emit("change", this.currentValue - 1);
    },

    increment() {
      this.$emit("change", this.currentValue + 1);
    },

    setValue(event) {
      let value = parseInt(event.target.value) || 0;

      if (value > this.maxValue) {
        value = this.maxValue;
      }

      if (value < this.minValue) {
        value = this.minValue;
      }

      this.currentValue = value;

      this.$emit("change", this.currentValue);
    },
  },
  watch: {
    value() {
      this.currentValue = this.value;
    },
  },
};
</script>
