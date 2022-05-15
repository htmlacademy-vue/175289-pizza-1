<template>
  <div class="app-layout-default">
    <AppLayoutHeader />
    <main class="layout">
      <div class="layout__sidebar sidebar">
        <a href="index.html" class="logo layout__logo">
          <img
            src="@/assets/img/logo.svg"
            alt="V!U!E! Pizza logo"
            width="90"
            height="40"
          />
        </a>

        <a href="#" class="layout__link layout__link--active">
          История заказов
        </a>

        <a href="#" class="layout__link layout__link--active">
          Мои данные
        </a>
      </div>

      <div class="layout__content">
        <slot />
      </div>
    </main>
  </div>
</template>

<script>
import AppLayoutHeader from "@/layouts/AppLayoutHeader";

export default {
  name: "AppLayoutDefault",
  components: { AppLayoutHeader },
};
</script>
