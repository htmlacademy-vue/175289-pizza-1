<template>
  <div class="content__ingredients">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>

      <div class="sheet__content ingredients">
        <div class="ingredients__sauce">
          <p>Основной соус:</p>

          <AppRadioButton
            v-for="sauce in sauces"
            :key="sauce.name"
            class="ingredients__input"
            name="sauce"
            :text="sauce.name"
            :value="sauce.value"
            :isChecked="sauce === pizza.sauce"
            @change="$emit('changeSauce', sauce)"
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
              <ItemCounter
                class="ingredients__counter"
                :value="getIngredientCount(ingredient)"
                @change="
                  $emit('changeIngredient', {
                    item: ingredient,
                    count: $event,
                  })
                "
              />
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
    sauces: {
      type: Array,
      required: true,
    },
    ingredients: {
      type: Array,
      required: true,
    },
    pizza: {
      type: Object,
      required: true,
    },
  },
  methods: {
    getIngredientCount(ingredient) {
      const index = this.pizza.ingredients.findIndex(
        ({ value }) => value === ingredient.value
      );

      return ~index ? this.pizza.ingredients[index].count : 0;
    },
  },
};
</script>
