<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <div class="content__dough">
          <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите тесто</h2>

            <div class="sheet__content dough">
              <BuilderDoughSelector
                v-for="(dough, index) in doughs"
                :key="dough.name"
                :dough="dough"
                :isChecked="index === 0"
              />
            </div>
          </div>
        </div>

        <div class="content__diameter">
          <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите размер</h2>

            <div class="sheet__content diameter">
              <BuilderSizeSelector
                v-for="(size, index) in sizes"
                :key="size.name"
                :size="size"
                :isChecked="index === 1"
              />
            </div>
          </div>
        </div>

        <div class="content__ingredients">
          <div class="sheet">
            <h2 class="title title--small sheet__title">
              Выберите ингредиенты
            </h2>

            <div class="sheet__content ingredients">
              <div class="ingredients__sauce">
                <p>Основной соус:</p>

                <AppRadioButton
                  v-for="(sauce, index) in sauces"
                  :key="sauce.name"
                  class="ingredients__input"
                  name="sauce"
                  :text="sauce.name"
                  :value="sauce.value"
                  :isChecked="index === 0"
                />
              </div>

              <div class="ingredients__filling">
                <p>Начинка:</p>

                <ul class="ingredients__list">
                  <BuilderIngredientsSelector
                    v-for="ingredient in ingredients"
                    :key="ingredient.name"
                    :ingredient="ingredient"
                  />
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="content__pizza">
          <label class="input">
            <span class="visually-hidden">Название пиццы</span>
            <input
              type="text"
              name="pizza_name"
              placeholder="Введите название пиццы"
            />
          </label>

          <div class="content__constructor">
            <BuilderPizzaView />
          </div>

          <div class="content__result">
            <BuilderPriceCounter />
            <AppButton isDisabled>Готовьте!</AppButton>
          </div>
        </div>
      </div>
    </form>
  </main>
</template>

<script>
import pizza from "@/static/pizza.json";
import {
  normalizeDough,
  normalizeIngredient,
  normalizeSize,
  normalizeSauce,
} from "@/common/helpers";
import AppButton from "@/common/components/AppButton";
import AppRadioButton from "@/common/components/AppRadioButton";
import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector";
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView";
import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter";

export default {
  name: "IndexPage",
  components: {
    AppButton,
    AppRadioButton,
    BuilderDoughSelector,
    BuilderIngredientsSelector,
    BuilderSizeSelector,
    BuilderPizzaView,
    BuilderPriceCounter,
  },
  data() {
    return {
      doughs: pizza.dough.map(normalizeDough),
      ingredients: pizza.ingredients.map(normalizeIngredient),
      sizes: pizza.sizes.map(normalizeSize),
      sauces: pizza.sauces.map(normalizeSauce),
    };
  },
};
</script>

<style></style>
