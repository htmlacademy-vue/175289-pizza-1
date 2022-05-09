<template>
  <div
    :draggable="draggable"
    @dragstart.self="onDrag"
    @dragover.prevent
    @gradenter.prevent
  >
    <slot />
  </div>
</template>

<script>
import { DATA_TRANSFER_PAYLOAD, MOVE } from "../constants";

export default {
  name: "AppDrag",
  props: {
    draggable: {
      type: Boolean,
      default: true,
    },
    transferData: {
      type: Object,
      required: true,
    },
  },
  methods: {
    onDrag({ dataTransfer }) {
      dataTransfer.effectAllowed = MOVE;
      dataTransfer.dropEffect = MOVE;
      dataTransfer.setData(
        DATA_TRANSFER_PAYLOAD,
        JSON.stringify(this.transferData)
      );
    },
  },
};
</script>
