<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <BuilderDoughSelector />

        <BuilderSizeSelector />

        <BuilderIngredientsSelector />

        <div class="content__pizza">
          <label class="input">
            <span class="visually-hidden">Название пиццы</span>
            <input
              type="text"
              name="pizza_name"
              :value="pizza.name"
              placeholder="Введите название пиццы"
              @input="changeName($event.target.value)"
            />
          </label>

          <div class="content__constructor">
            <AppDrop @drop="moveIngredient($event)">
              <BuilderPizzaView />
            </AppDrop>
          </div>

          <div class="content__result">
            <p>Итого: {{ price }} ₽</p>

            <AppButton :disabled="buttonDisabled" @click="onButtonClick">
              Готовьте!
            </AppButton>
          </div>
        </div>
      </div>
    </form>
    <router-view />
  </main>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import AppButton from "@/common/components/AppButton";
import AppDrop from "@/common/components/AppDrop";
import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector";
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView";
import {
  SET_PIZZA_NAME,
  SET_PIZZA_INGREDIENT,
  MOVE_PIZZA_INGREDIENT,
} from "@/store/mutations-types";

export default {
  name: "IndexPage",
  components: {
    AppButton,
    AppDrop,
    BuilderDoughSelector,
    BuilderSizeSelector,
    BuilderIngredientsSelector,
    BuilderPizzaView,
  },
  computed: {
    ...mapState("Builder", ["pizza"]),
    ...mapGetters("Builder", {
      price: "getPrice",
    }),
    buttonDisabled() {
      return !this.pizza.name || !Object.keys(this.pizza.ingredients).length;
    },
  },
  methods: {
    ...mapMutations("Builder", {
      changeName: SET_PIZZA_NAME,
      changeIngredient: SET_PIZZA_INGREDIENT,
      moveIngredient: MOVE_PIZZA_INGREDIENT,
    }),
    onButtonClick() {
      console.log("Готовим");
    },
  },
};
</script>
