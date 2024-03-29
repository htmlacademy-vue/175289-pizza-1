<template>
  <main class="content">
    <router-view />

    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <BuilderDoughSelector
          data-test="dough-selector"
          @change-dough="changeDough"
        />

        <BuilderSizeSelector
          data-test="size-selector"
          @change-size="changeSize"
        />

        <BuilderIngredientsSelector
          data-test="ingredients-selector"
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
              data-test="name-input"
              @input="changeName($event.target.value)"
            />
          </label>

          <BuilderPizzaView data-test="view" @drop="moveIngredient" />

          <div class="content__result">
            <p>Итого: {{ price }} ₽</p>

            <AppButton
              :disabled="buttonDisabled"
              data-test="button"
              @click="addPizzaToCart"
            >
              Готовьте!
            </AppButton>
          </div>
        </div>
      </div>
    </form>
  </main>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import { uniqueId } from "lodash";
import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector";
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView";
import { UPDATE_PIZZA } from "@/store/mutations-types";

export default {
  name: "IndexPage",
  components: {
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
    changeDough(dough) {
      this.updatePizza({ dough });
    },
    changeSize(size) {
      this.updatePizza({ size });
    },
    changeSauce(sauce) {
      this.updatePizza({ sauce });
    },
    changeIngredient({ ingredient, quantity }) {
      const ingredients = [...this.pizza.ingredients];
      const index = ingredients.findIndex(({ id }) => id === ingredient.id);

      if (quantity > 0) {
        ~index
          ? (ingredients[index].quantity = quantity)
          : ingredients.push({ ...ingredient, quantity });
      } else {
        ingredients.splice(index, 1);
      }

      this.updatePizza({ ingredients });
    },
    moveIngredient(ingredient) {
      const ingredients = [...this.pizza.ingredients];
      const index = ingredients.findIndex(({ id }) => id === ingredient.id);

      ~index
        ? (ingredients[index].quantity = ingredients[index].quantity + 1)
        : ingredients.push({ ...ingredient, quantity: 1 });

      this.updatePizza({ ingredients });
    },
    changeName(name) {
      this.updatePizza({ name });
    },
    addPizzaToCart() {
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
    },
  },
};
</script>
