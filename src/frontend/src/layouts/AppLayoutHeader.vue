<template>
  <header class="header">
    <div class="header__logo">
      <router-link :to="AppRoute.MAIN" class="logo">
        <img
          src="@/assets/img/logo.svg"
          alt="V!U!E! Pizza logo"
          width="90"
          height="40"
        />
      </router-link>
    </div>

    <div class="header__cart">
      <router-link :to="AppRoute.CART">{{ totalPrice }} ₽</router-link>
    </div>

    <div v-if="user" class="header__user" data-test="user-buttons">
      <router-link :to="AppRoute.PROFILE">
        <img :src="user.avatar" :alt="user.name" width="32" height="32" />
        <span>{{ user.name }}</span>
      </router-link>

      <a
        class="header__logout"
        href="#"
        data-test="logout-button"
        @click.prevent="logout"
      >
        <span>Выйти</span>
      </a>
    </div>

    <div v-else class="header__user">
      <router-link
        :to="AppRoute.LOGIN"
        class="header__login"
        data-test="login-button"
      >
        <span>Войти</span>
      </router-link>
    </div>
  </header>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { AppRoute } from "@/common/constants";

export default {
  name: "AppLayoutHeader",
  data() {
    return {
      AppRoute,
    };
  },
  computed: {
    ...mapState("Auth", ["user"]),
    ...mapGetters("Cart", ["totalPrice"]),
  },
  methods: {
    logout() {
      this.$store.dispatch("Auth/logout").then(() => {
        this.$notifier.success("Вы успешно вышли");
        this.$router.push(AppRoute.LOGIN);
      });
    },
  },
};
</script>
