<template>
  <div class="content__ingredients">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>

      <div class="sheet__content ingredients">
        <div class="ingredients__sauce">
          <p>Основной соус:</p>

          <AppRadioButton
            v-for="sauce in data.sauces"
            :key="sauce.name"
            class="ingredients__input"
            name="sauce"
            :text="sauce.name"
            :value="sauce.value"
            :isChecked="sauce.id === selectedSauce.id"
            data-test="sauce"
            @change="$emit('change-sauce', sauce)"
          />
        </div>

        <div class="ingredients__filling">
          <p>Начинка:</p>

          <ul class="ingredients__list">
            <li
              v-for="ingredient in data.ingredients"
              :key="ingredient.name"
              class="ingredients__item"
              data-test="filling"
            >
              <AppDrop @drop="$emit('drop', $event)">
                <AppDrag
                  :class="`filling filling--${ingredient.value}`"
                  :draggable="
                    getIngredientQuantity(ingredient.id) < maxIngredientQuantity
                  "
                  :transfer-data="ingredient"
                >
                  {{ ingredient.name }}
                </AppDrag>
              </AppDrop>
              <AppCounter
                class="ingredients__counter"
                :maxValue="maxIngredientQuantity"
                :value="getIngredientQuantity(ingredient.id)"
                data-test="filling-counter"
                @change="
                  $emit('change-ingredient', {
                    ingredient,
                    quantity: $event,
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
import { mapState, mapGetters } from "vuex";
import { MAX_INGREDIENT_QUANTITY } from "@/common/constants";

export default {
  name: "BuilderIngredientsSelector",
  data() {
    return {
      maxIngredientQuantity: MAX_INGREDIENT_QUANTITY,
    };
  },
  computed: {
    ...mapState("Builder", ["data"]),
    ...mapGetters("Builder", [
      "getIngredientQuantity",
      "selectedIngredients",
      "selectedSauce",
    ]),
  },
};
</script>
