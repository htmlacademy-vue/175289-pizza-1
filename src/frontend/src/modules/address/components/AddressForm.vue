<template>
  <div class="sheet address-form" :class="{ 'address-form--opened': isEdit }">
    <div class="address-form__header">
      <b>
        Адрес №{{ number }}.
        <template v-if="!isEdit">{{ address.name }}</template>
      </b>
      <div v-if="!isEdit" class="address-form__edit">
        <button class="icon" type="button" @click="isEdit = true">
          <span class="visually-hidden">Изменить адрес</span>
        </button>
      </div>
    </div>

    <template v-if="isEdit">
      <form @submit.prevent="saveAddress">
        <div class="address-form__wrapper">
          <div class="address-form__input">
            <label class="input">
              <span>Название адреса*</span>
              <input
                v-model="address.name"
                type="text"
                name="addr-name"
                placeholder="Введите название адреса"
                required
              />
            </label>
          </div>
          <div class="address-form__input address-form__input--size--normal">
            <label class="input">
              <span>Улица*</span>
              <input
                v-model="address.street"
                type="text"
                name="addr-street"
                placeholder="Введите название улицы"
                required
              />
            </label>
          </div>
          <div class="address-form__input address-form__input--size--small">
            <label class="input">
              <span>Дом*</span>
              <input
                v-model="address.building"
                type="text"
                name="addr-house"
                placeholder="Введите номер дома"
                required
              />
            </label>
          </div>
          <div class="address-form__input address-form__input--size--small">
            <label class="input">
              <span>Квартира</span>
              <input
                v-model="address.flat"
                type="text"
                name="addr-apartment"
                placeholder="Введите № квартиры"
              />
            </label>
          </div>
          <div class="address-form__input">
            <label class="input">
              <span>Комментарий</span>
              <input
                v-model="address.comment"
                type="text"
                name="addr-comment"
                placeholder="Введите комментарий"
              />
            </label>
          </div>
        </div>

        <div class="address-form__buttons">
          <button
            class="button button--transparent"
            type="button"
            @click="addressToEdit ? null : $emit('cancel')"
          >
            {{ addressToEdit ? "Удалить" : "Закрыть" }}
          </button>
          <button class="button" type="submit">Сохранить</button>
        </div>
      </form>
    </template>
    <template v-else>
      <p>{{ address.street }}, {{ address.building }}, {{ address.flat }}</p>
      <small>{{ address.comment }}</small>
    </template>
  </div>
</template>

<script>
import { cloneDeep } from "lodash";
import { mapState, mapActions } from "vuex";

const createNewAddress = () => ({
  name: "",
  street: "",
  building: "",
  flat: "",
  comment: "",
});

export default {
  name: "AddressForm",
  props: {
    addressToEdit: {
      type: Object,
      default: null,
    },
    number: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      address: createNewAddress(),
      isEdit: true,
    };
  },
  created() {
    if (this.addressToEdit) {
      this.address = cloneDeep(this.addressToEdit);
      this.isEdit = false;
    }
  },
  computed: {
    ...mapState("Auth", ["user"]),
  },
  methods: {
    ...mapActions("Addresses", {
      postAddress: "post",
      putAddress: "put",
    }),
    async saveAddress() {
      if (this.addressToEdit) {
        await this.putAddress({
          ...this.address,
          userId: this.user.id,
        });
      } else {
        await this.postAddress({
          ...this.address,
          userId: this.user.id,
        });
        this.$emit("save");
      }

      this.isEdit = false;
    },
  },
};
</script>
