<template>
  <div class="content__ingredients">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>

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
            <li
              v-for="ingredient in ingredients"
              :key="ingredient.name"
              class="ingredients__item"
            >
              <span class="filling" :class="`filling--${ingredient.value}`">
                {{ ingredient.name }}
              </span>
              <ItemCounter />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppRadioButton from "@/common/components/AppRadioButton";
import ItemCounter from "@/common/components/ItemCounter";

export default {
  name: "BuilderIngredientsSelector",
  components: { AppRadioButton, ItemCounter },
  props: {
    ingredients: {
      type: Array,
      required: true,
    },
    sauces: {
      type: Array,
      required: true,
    },
  },
};
</script>
