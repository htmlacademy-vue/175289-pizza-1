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
            @change="changeDough(dough)"
          />
          <b>{{ dough.name }}</b>
          <span>{{ dough.description }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import { SET_PIZZA_DOUGH } from "@/store/mutations-types";

export default {
  name: "BuilderDoughSelector",
  computed: {
    ...mapState("Builder", ["doughs"]),
    ...mapGetters("Builder", ["selectedDough"]),
  },
  methods: {
    ...mapMutations("Builder", {
      changeDough: SET_PIZZA_DOUGH,
    }),
  },
};
</script>
