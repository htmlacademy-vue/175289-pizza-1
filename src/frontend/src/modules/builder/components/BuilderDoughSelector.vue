<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>

      <div class="sheet__content dough">
        <label
          v-for="dough in doughs"
          :key="dough.name"
          class="dough__input"
          :class="`dough__input--${dough.value}`"
        >
          <input
            class="visually-hidden"
            type="radio"
            name="dough"
            :value="dough.value"
            :checked="dough === selectedDough"
            @change="$emit('changeDough', dough)"
          />
          <b>{{ dough.name }}</b>
          <span>{{ dough.description }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BuilderDoughSelector",
  props: {
    doughs: {
      type: Array,
      required: true,
    },
    selectedDough: {
      type: Object,
      required: true,
    },
  },
};
</script>
