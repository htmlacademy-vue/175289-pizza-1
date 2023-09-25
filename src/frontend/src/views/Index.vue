<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <BuilderDoughSelector @change-dough="changeDough" />

        <BuilderSizeSelector @change-size="changeSize" />

        <BuilderIngredientsSelector
          @change-sauce="changeSauce"
          @change-ingredient="changeIngredient"
        />

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
            <AppDrop @drop="moveIngredient">
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
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import { uniqueId } from "lodash";
import AppDrop from "@/common/components/AppDrop";
import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector";
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView";
import { UPDATE_PIZZA } from "@/store/mutations-types";

export default {
  name: "IndexPage",
  components: {
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
    ...mapActions("Cart", ["updateCart"]),
    ...mapMutations("Builder", {
      updatePizza: UPDATE_PIZZA,
    }),
    onButtonClick() {
      const value = {
        ...this.pizza,
        id: this.pizza.id ?? uniqueId(),
        quantity: this.pizza.quantity ?? 1,
        price: this.price,
      };
      this.updateCart({
        entity: "pizzas",
        value,
      });

      // ToDo: reset builder
    },
    changeDough(dough) {
      this.updatePizza({ dough });
    },
    changeSize(size) {
      this.updatePizza({ size });
    },
    changeSauce(sauce) {
      this.updatePizza({ sauce });
    },
    changeIngredient({ ingredient, count }) {
      const ingredients = [...this.pizza.ingredients];
      const index = ingredients.findIndex(({ id }) => id === ingredient.id);

      if (count > 0) {
        ~index
          ? (ingredients[index].count = count)
          : ingredients.push({ ...ingredient, count });
      } else {
        ingredients.splice(index, 1);
      }

      this.updatePizza({ ingredients });
    },
    moveIngredient(ingredient) {
      const ingredients = [...this.pizza.ingredients];
      const index = ingredients.findIndex(({ id }) => id === ingredient.id);

      ~index
        ? (ingredients[index].count = ingredients[index].count + 1)
        : ingredients.push({ ...ingredient, count: 1 });

      this.updatePizza({ ingredients });
    },
    changeName(name) {
      this.updatePizza({ name });
    },
  },
};
</script>
