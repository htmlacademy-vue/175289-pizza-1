<template>
  <div
    ref="dialog"
    class="popup"
    tabindex="0"
    data-test="dialog"
    @click.self="closeDialog"
    @keydown.esc="closeDialog"
  >
    <div class="popup__content">
      <a class="close" href="#" data-test="close-button" @click="closeDialog">
        <span class="visually-hidden">Закрыть попап</span>
      </a>
      <div class="popup__title">
        <h2 class="title">Спасибо за заказ</h2>
      </div>
      <p>Мы начали готовить Ваш заказ, скоро привезём его вам ;)</p>
      <div class="popup__button">
        <a
          class="button"
          href="#"
          data-test="dialog-button"
          @click="closeDialog"
        >
          Отлично, я жду!
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CartPopup",
  mounted() {
    this.$refs.dialog.focus();
  },
  methods: {
    closeDialog() {
      this.$emit("close");
    },
  },
};
</script>
