<template>
  <header class="header">
    <div class="header__logo">
      <router-link to="/" class="logo">
        <img
          src="@/assets/img/logo.svg"
          alt="V!U!E! Pizza logo"
          width="90"
          height="40"
        />
      </router-link>
    </div>

    <div class="header__cart">
      <router-link to="/cart">{{ totalPrice }} ₽</router-link>
    </div>

    <div class="header__user">
      <template v-if="user">
        <router-link to="/profile">
          <img :src="user.avatar" :alt="user.name" width="32" height="32" />
          <span>{{ user.name }}</span>
        </router-link>

        <a href="#" class="header__logout" @click.prevent="logout">
          <span>Выйти</span>
        </a>
      </template>

      <template v-else>
        <router-link to="/login" class="header__login">
          <span>Войти</span>
        </router-link>
      </template>
    </div>
  </header>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "AppLayoutHeader",
  computed: {
    ...mapState("Auth", ["user"]),
    ...mapGetters("Cart", ["totalPrice"]),
  },
  methods: {
    logout() {
      this.$store.dispatch("Auth/logout").then(() => {
        this.$notifier.success("Вы успешно вышли");
      });
    },
  },
};
</script>
