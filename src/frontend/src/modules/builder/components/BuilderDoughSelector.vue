<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>

      <div class="sheet__content dough">
        <label
          v-for="dough in data.dough"
          :key="dough.name"
          class="dough__input"
          :class="`dough__input--${dough.value}`"
        >
          <input
            class="visually-hidden"
            type="radio"
            name="dough"
            :value="dough.value"
            :checked="dough.id === selectedDough.id"
            @change="$emit('change-dough', dough)"
          />
          <b>{{ dough.name }}</b>
          <span>{{ dough.description }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "BuilderDoughSelector",
  computed: {
    ...mapState("Builder", ["data"]),
    ...mapGetters("Builder", ["selectedDough"]),
  },
};
</script>
