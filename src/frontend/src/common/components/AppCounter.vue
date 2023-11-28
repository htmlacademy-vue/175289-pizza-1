<template>
  <div class="counter">
    <button
      class="counter__button counter__button--minus"
      type="button"
      :disabled="value <= minValue"
      @click="decrement"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input
      class="counter__input"
      type="text"
      name="counter"
      :value="value"
      @input="setValue"
    />
    <button
      class="counter__button counter__button--plus"
      :class="{ 'counter__button--orange': orange }"
      type="button"
      :disabled="value >= maxValue"
      @click="increment"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "AppCounter",
  props: {
    maxValue: {
      type: Number,
      default: 100,
    },
    minValue: {
      type: Number,
      default: 0,
    },
    orange: {
      type: Boolean,
      default: false,
    },
    value: {
      type: Number,
      required: true,
    },
  },
  methods: {
    decrement() {
      this.$emit("change", this.value - 1);
    },

    increment() {
      this.$emit("change", this.value + 1);
    },

    setValue(event) {
      let value = parseInt(event.target.value) || 0;

      if (value > this.maxValue) {
        value = this.maxValue;
      }

      if (value < this.minValue) {
        value = this.minValue;
      }

      this.$emit("change", value);
    },
  },
};
</script>
