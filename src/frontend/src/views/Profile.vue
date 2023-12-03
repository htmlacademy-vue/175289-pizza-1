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
      :key="address.id"
      class="layout__address"
      data-test="address"
    >
      <AddressForm :address-to-edit="address" :number="index + 1" />
    </div>

    <!-- Форма создания нового адреса -->
    <div v-show="showNewAddressForm" class="layout__address">
      <AddressForm
        :number="addresses.length + 1"
        data-test="add-address-form"
        @cancel="showNewAddressForm = false"
        @save="showNewAddressForm = false"
      />
    </div>

    <div v-show="!showNewAddressForm" class="layout__button">
      <button
        class="button button--border"
        type="button"
        @click="showNewAddressForm = true"
        data-test="add-address-button"
      >
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
  data() {
    return {
      showNewAddressForm: false,
    };
  },
  computed: {
    ...mapState("Auth", ["user"]),
    ...mapState("Addresses", ["addresses"]),
  },
};
</script>
