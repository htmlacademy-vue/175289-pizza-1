<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <BuilderDoughSelector
          :doughs="doughs"
          :pizza="pizza"
          @changeDough="changeDough"
        />

        <BuilderSizeSelector
          :sizes="sizes"
          :pizza="pizza"
          @changeSize="changeSize"
        />

        <BuilderIngredientsSelector
          :sauces="sauces"
          :ingredients="ingredients"
          :pizza="pizza"
          @changeSauce="changeSauce"
          @changeIngredient="changeIngredient"
        />

        <div class="content__pizza">
          <label class="input">
            <span class="visually-hidden">Название пиццы</span>
            <input
              type="text"
              name="pizza_name"
              v-model.trim="pizza.name"
              placeholder="Введите название пиццы"
            />
          </label>

          <div class="content__constructor">
            <BuilderPizzaView :pizza="pizza" />
          </div>

          <div class="content__result">
            <BuilderPriceCounter :pizza="pizza" />
            <AppButton :disabled="buttonDisabled" @click="onButtonClick">
              Готовьте!
            </AppButton>
          </div>
        </div>
      </div>
    </form>
  </main>
</template>

<script>
import AppButton from "@/common/components/AppButton";
import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector";
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView";
import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter";

export default {
  name: "IndexPage",
  components: {
    AppButton,
    BuilderDoughSelector,
    BuilderSizeSelector,
    BuilderIngredientsSelector,
    BuilderPizzaView,
    BuilderPriceCounter,
  },
  props: {
    doughs: {
      type: Array,
      required: true,
    },

    sizes: {
      type: Array,
      required: true,
    },

    sauces: {
      type: Array,
      required: true,
    },

    ingredients: {
      type: Array,
      required: true,
    },
  },
  data: function () {
    return {
      pizza: {
        name: "",
        dough: this.doughs[0],
        size: this.sizes[1],
        sauce: this.sauces[0],
        ingredients: [],
      },
    };
  },
  computed: {
    buttonDisabled() {
      return !this.pizza.name || !Object.keys(this.pizza.ingredients).length;
    },
  },
  methods: {
    changeDough(item) {
      this.pizza.dough = item;
    },
    changeSize(item) {
      this.pizza.size = item;
    },
    changeSauce(item) {
      this.pizza.sauce = item;
    },
    changeIngredient({ item, count }) {
      const ingredients = [...this.pizza.ingredients];
      const index = ingredients.findIndex(({ id }) => id === item.id);

      if (count > 0) {
        ~index
          ? (ingredients[index].count = count)
          : ingredients.push({ ...item, count });
      } else {
        ingredients.splice(index, 1);
      }

      this.pizza.ingredients = ingredients;
    },
    onButtonClick() {
      console.log("Готовим");
    },
  },
};
</script>

<style></style>
