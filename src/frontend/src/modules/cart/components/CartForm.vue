<template>
  <div class="cart__form">
    <div class="cart-form">
      <label class="cart-form__select">
        <span class="cart-form__label">Получение заказа:</span>

        <select
          class="select"
          name="delivery"
          :value="delivery"
          @change="updateDelivery($event.target.value)"
        >
          <option value="pickup">Получу сам</option>
          <option value="new address">Новый адрес</option>
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

      <div v-if="delivery !== 'pickup'" class="cart-form__address">
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
            :value="address.building"
            required
            @input="updateAddress({ building: $event })"
          />
        </div>

        <div class="cart-form__input cart-form__input--small">
          <AppInput
            label="Квартира"
            name="apartment"
            :value="address.flat"
            @input="updateAddress({ flat: $event })"
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
  UPDATE_CART_DELIVERY,
  UPDATE_CART_ADDRESS,
} from "@/store/mutations-types";

export default {
  name: "CartForm",
  computed: {
    ...mapState("Cart", ["delivery", "phone", "address"]),
  },
  methods: {
    ...mapMutations("Cart", {
      updatePhone: UPDATE_CART_PHONE,
      updateDelivery: UPDATE_CART_DELIVERY,
      updateAddress: UPDATE_CART_ADDRESS,
    }),
  },
};
</script>
