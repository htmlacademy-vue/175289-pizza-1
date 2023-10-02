<template>
  <label
    class="input"
    :class="{ 'input--big-label': bigLabel, 'input--error': !!errorText }"
  >
    <span>{{ label }}{{ bigLabel ? ":" : "" }}{{ required ? "*" : "" }}</span>
    <input
      type="text"
      :name="name"
      :value="value"
      :placeholder="placeholder"
      @input="$emit('input', $event.target.value)"
    />
  </label>
</template>

<script>
export default {
  name: "AppInput",
  props: {
    label: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default: "",
    },
    bigLabel: {
      type: Boolean,
      default: false,
    },
    errorText: {
      type: String,
      default: "",
    },
    required: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
