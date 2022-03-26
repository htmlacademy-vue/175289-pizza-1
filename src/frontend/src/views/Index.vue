<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <div class="content__dough">
          <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите тесто</h2>

            <div class="sheet__content dough">
              <label
                v-for="(dough, index) in doughs"
                :key="dough.name"
                class="dough__input"
                :class="`dough__input--${dough.value}`"
              >
                <input
                  type="radio"
                  name="dought"
                  :value="dough.value"
                  class="visually-hidden"
                  :checked="index === 0"
                />
                <b>{{ dough.name }}</b>
                <span>{{ dough.description }}</span>
              </label>
            </div>
          </div>
        </div>

        <div class="content__diameter">
          <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите размер</h2>

            <div class="sheet__content diameter">
              <label
                v-for="(size, index) in sizes"
                :key="size.name"
                class="diameter__input"
                :class="`diameter__input--${size.value}`"
              >
                <input
                  type="radio"
                  name="diameter"
                  :value="size.value"
                  class="visually-hidden"
                  :checked="index === 1"
                />
                <span>{{ size.name }}</span>
              </label>
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

                <label
                  v-for="(sauce, index) in sauces"
                  :key="sauce.name"
                  class="radio ingredients__input"
                >
                  <input
                    type="radio"
                    name="sauce"
                    :value="sauce.value"
                    :checked="index === 0"
                  />
                  <span>{{ sauce.name }}</span>
                </label>
              </div>

              <div class="ingredients__filling">
                <p>Начинка:</p>

                <ul class="ingredients__list">
                  <li
                    v-for="ingredient in ingredients"
                    :key="ingredient.name"
                    class="ingredients__item"
                  >
                    <span
                      class="filling"
                      :class="`filling--${ingredient.value}`"
                    >
                      {{ ingredient.name }}
                    </span>
                    <ItemCounter />
                  </li>
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
            <div class="pizza pizza--foundation--big-tomato">
              <div class="pizza__wrapper">
                <div class="pizza__filling pizza__filling--ananas"></div>
                <div class="pizza__filling pizza__filling--bacon"></div>
                <div class="pizza__filling pizza__filling--cheddar"></div>
              </div>
            </div>
          </div>

          <div class="content__result">
            <p>Итого: 0 ₽</p>
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
import ItemCounter from "@/common/components/ItemCounter";

export default {
  name: "IndexPage",
  components: { AppButton, ItemCounter },
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
