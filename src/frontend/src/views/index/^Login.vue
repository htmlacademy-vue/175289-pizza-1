<template>
  <div class="sign-form">
    <router-link to="/" class="close close--white">
      <span class="visually-hidden">Закрыть форму авторизации</span>
    </router-link>
    <div class="sign-form__title">
      <h1 class="title title--small">Авторизуйтесь на сайте</h1>
    </div>
    <form data-test="login-form" @submit.prevent="onSubmit">
      <div class="sign-form__input">
        <AppInput
          ref="inputEmail"
          label="E-mail"
          name="email"
          v-model="email"
          :error-text="validations.email.error"
          data-test="email-component"
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
          data-test="password-component"
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
import { guest } from "@/middlewares";

export default {
  name: "LoginPage",
  middlewares: [guest],
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
    onSubmit() {
      if (this.isFormValid()) {
        this.login();
      }
    },
    isFormValid() {
      return this.$validateFields(
        { email: this.email, password: this.password },
        this.validations
      );
    },
    login() {
      this.$store
        .dispatch("Auth/login", {
          email: this.email,
          password: this.password,
        })
        .then(() => {
          this.$router.push(AppRoute.MAIN);
        });
    },
  },
};
</script>
