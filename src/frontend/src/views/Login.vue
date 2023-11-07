<template>
  <div class="sign-form">
    <router-link to="/" class="close close--white">
      <span class="visually-hidden">Закрыть форму авторизации</span>
    </router-link>
    <div class="sign-form__title">
      <h1 class="title title--small">Авторизуйтесь на сайте</h1>
    </div>
    <form @submit.prevent="login">
      <div class="sign-form__input">
        <AppInput
          ref="inputEmail"
          label="E-mail"
          name="email"
          v-model="email"
          :error-text="validations.email.error"
          placeholder="example@mail.ru"
        />
      </div>

      <div class="sign-form__input">
        <AppInput
          label="Пароль"
          type="password"
          name="pass"
          v-model="password"
          :error-text="validations.password.error"
          placeholder="***********"
        />
      </div>
      <button type="submit" class="button">Авторизоваться</button>
    </form>
  </div>
</template>

<script>
import { AppRoute } from "@/common/constants";
import validator from "@/common/mixins/validator";

export default {
  name: "LoginPage",
  mixins: [validator],
  data() {
    return {
      email: "",
      password: "",
      validations: {
        email: {
          error: "",
          rules: ["required", "email"],
        },
        password: {
          error: "",
          rules: ["required"],
        },
      },
    };
  },
  watch: {
    email() {
      this.$clearValidationErrors();
    },
    password() {
      this.$clearValidationErrors();
    },
  },
  mounted() {
    this.$refs.inputEmail.$refs.input.focus();
  },
  methods: {
    login() {
      const { email, password } = this;

      if (!this.$validateFields({ email, password }, this.validations)) {
        return;
      }

      this.$store
        .dispatch("Auth/login", {
          email,
          password,
        })
        .then(() => {
          this.$router.push(AppRoute.MAIN);
        });
    },
  },
};
</script>
