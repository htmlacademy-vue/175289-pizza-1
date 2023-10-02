<template>
  <div>
    <div class="layout__title">
      <h1 class="title title--big">Мои данные</h1>
    </div>

    <div class="user">
      <picture>
        <img :src="user.avatar" :alt="user.name" width="72" height="72" />
      </picture>
      <div class="user__name">
        <span>{{ user.name }}</span>
      </div>
      <p class="user__phone">
        Контактный телефон: <span>{{ user.phone }}</span>
      </p>
    </div>

    <div
      v-for="(address, index) in addresses"
      :key="addresses.id"
      class="layout__address"
    >
      <AddressForm :address="address" :address-number="index + 1" />
    </div>

    <div class="layout__button">
      <button type="button" class="button button--border">
        Добавить новый адрес
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import AddressForm from "@/modules/address/components/AddressForm.vue";

export default {
  name: "ProfilePage",
  components: { AddressForm },
  computed: {
    ...mapState("Auth", ["user"]),
    ...mapState("Addresses", ["addresses"]),
  },
};
</script>
