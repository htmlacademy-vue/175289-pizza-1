<template>
  <div class="popup">
    <a class="close" href="#" @click="close">
      <span class="visually-hidden">Закрыть попап</span>
    </a>
    <div class="popup__title">
      <h2 class="title">Спасибо за заказ</h2>
    </div>
    <p>Мы начали готовить Ваш заказ, скоро привезём его вам ;)</p>
    <div class="popup__button">
      <a class="button" href="#" @click="close">Отлично, я жду!</a>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { AppRoute } from "@/common/constants";

export default {
  name: "CartPopup",
  mounted() {
    document.addEventListener("keydown", this.onDocumentKeydown);
  },
  destroyed() {
    document.removeEventListener("keydown", this.onDocumentKeydown);
  },
  computed: {
    ...mapState("Auth", ["isAuthenticated"]),
  },
  methods: {
    onDocumentKeydown({ code }) {
      if (code === "Escape") {
        this.close();
      }
    },
    close() {
      // ToDo:
      // При редиректе в раздел заказов после оформления заказа он заканчивается ошибкой.
      // Вероятно, есть какая то проблема в на странице, но пока не поняла, какая
      this.$router.push(this.isAuthenticated ? AppRoute.ORDERS : AppRoute.MAIN);
    },
  },
};
</script>
