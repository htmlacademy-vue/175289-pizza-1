<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <BuilderDoughSelector :doughs="doughs" />

        <BuilderSizeSelector :sizes="sizes" />

        <BuilderIngredientsSelector
          :ingredients="ingredients"
          :sauces="sauces"
        />

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
import AppButton from "@/common/components/AppButton";
import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector";
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView";
import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter";

export default {
  name: "IndexPage",
  components: {
    AppButton,
    BuilderDoughSelector,
    BuilderIngredientsSelector,
    BuilderSizeSelector,
    BuilderPizzaView,
    BuilderPriceCounter,
  },
  props: {
    doughs: {
      type: Array,
      required: true,
    },

    ingredients: {
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
  },
};
</script>

<style></style>
