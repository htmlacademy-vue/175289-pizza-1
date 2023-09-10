<template>
  <div class="cart__form">
    <div class="cart-form">
      <label class="cart-form__select">
        <span class="cart-form__label">Получение заказа:</span>

        <select name="test" class="select">
          <option value="1">Получу сам</option>
          <option value="2">Новый адрес</option>
          <option value="3">Существующий адрес</option>
        </select>
      </label>

      <AppInput
        label="Контактный телефон"
        name="tel"
        :value="phone"
        placeholder="+7 999-999-99-99"
        big-label
        @input="updatePhone"
      />

      <div class="cart-form__address">
        <span class="cart-form__label">Новый адрес:</span>

        <div class="cart-form__input">
          <AppInput
            label="Улица"
            name="street"
            :value="address.street"
            required
            @input="updateAddress({ street: $event })"
          />
        </div>

        <div class="cart-form__input cart-form__input--small">
          <AppInput
            label="Дом"
            name="house"
            :value="address.house"
            required
            @input="updateAddress({ house: $event })"
          />
        </div>

        <div class="cart-form__input cart-form__input--small">
          <AppInput
            label="Квартира"
            name="apartment"
            :value="address.apartment"
            @input="updateAddress({ apartment: $event })"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import {
  UPDATE_CART_PHONE,
  UPDATE_CART_ADDRESS,
} from "@/store/mutations-types";

export default {
  name: "CartForm",
  computed: {
    ...mapState("Cart", ["address", "phone"]),
  },
  methods: {
    ...mapMutations("Cart", {
      updatePhone: UPDATE_CART_PHONE,
      updateAddress: UPDATE_CART_ADDRESS,
    }),
  },
};
</script>
