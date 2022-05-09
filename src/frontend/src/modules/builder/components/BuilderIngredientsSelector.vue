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
            :isChecked="sauce === selectedSauce"
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
              <AppDrop @drop="$emit('drop', $event)">
                <AppDrag
                  :class="`filling filling--${ingredient.value}`"
                  :draggable="
                    getIngredientCount(ingredient) < maxIngredientCount
                  "
                  :transfer-data="ingredient"
                >
                  {{ ingredient.name }}
                </AppDrag>
              </AppDrop>
              <ItemCounter
                class="ingredients__counter"
                :value="getIngredientCount(ingredient)"
                :maxValue="maxIngredientCount"
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
import AppDrop from "../../../common/components/AppDrop";
import AppDrag from "../../../common/components/AppDrag";
import AppRadioButton from "@/common/components/AppRadioButton";
import ItemCounter from "@/common/components/ItemCounter";
import { MAX_INGREDIENT_COUNT } from "@/common/constants";

export default {
  name: "BuilderIngredientsSelector",
  components: { AppDrop, AppDrag, AppRadioButton, ItemCounter },
  props: {
    sauces: {
      type: Array,
      required: true,
    },
    selectedSauce: {
      type: Object,
      required: true,
    },
    ingredients: {
      type: Array,
      required: true,
    },
    selectedIngredients: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      maxIngredientCount: MAX_INGREDIENT_COUNT,
    };
  },
  computed: {
    ingredientCounts() {
      const counts = {};

      this.selectedIngredients.map((item) => {
        counts[item.id] = item.count;
      });

      return counts;
    },
  },
  methods: {
    getIngredientCount(ingredient) {
      return this.ingredientCounts[ingredient.id] || 0;
    },
  },
};
</script>
