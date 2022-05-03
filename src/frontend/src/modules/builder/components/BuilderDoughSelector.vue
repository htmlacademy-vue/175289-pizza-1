<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>

      <div class="sheet__content dough">
        <label
          class="dough__input"
          :class="`dough__input--${dough.value}`"
          v-for="dough in doughs"
          :key="dough.name"
        >
          <input
            class="visually-hidden"
            type="radio"
            name="dough"
            :value="dough.value"
            :checked="dough === pizza.dough"
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
    pizza: {
      type: Object,
      required: true,
    },
  },
};
</script>
