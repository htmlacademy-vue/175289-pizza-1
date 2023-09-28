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
        <div class="input">
          <span>E-mail</span>
          <input
            ref="inputEmail"
            v-model="email"
            type="email"
            name="email"
            placeholder="example@mail.ru"
          />
        </div>
        <div v-if="validations.email.error" class="sign-form__error">
          {{ validations.email.error }}
        </div>
      </div>

      <div class="sign-form__input">
        <label class="input">
          <span>Пароль</span>
          <input
            v-model="password"
            type="password"
            name="pass"
            placeholder="***********"
          />
        </label>
        <div v-if="validations.password.error" class="sign-form__error">
          {{ validations.password.error }}
        </div>
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
    this.$refs.inputEmail.focus();
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
