<template>
  <div class="app-layout-default">
    <AppLayoutHeader />
    <main class="layout">
      <div class="layout__sidebar sidebar">
        <router-link to="/" class="logo layout__logo">
          <img
            src="@/assets/img/logo.svg"
            alt="V!U!E! Pizza logo"
            width="90"
            height="40"
          />
        </router-link>

        <router-link
          to="/orders"
          class="layout__link"
          active-class="layout__link--active"
        >
          История заказов
        </router-link>

        <router-link
          to="/profile"
          class="layout__link"
          active-class="layout__link--active"
        >
          Мои данные
        </router-link>
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
