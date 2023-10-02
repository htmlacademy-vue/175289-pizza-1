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
            <AppInput
              label="Название адреса"
              name="addr-name"
              v-model="address.name"
              placeholder="Введите название адреса"
              required
            />
          </div>
          <div class="address-form__input address-form__input--size--normal">
            <AppInput
              label="Улица"
              name="addr-street"
              v-model="address.street"
              placeholder="Введите название улицы"
              required
            />
          </div>
          <div class="address-form__input address-form__input--size--small">
            <AppInput
              label="Дом"
              name="addr-house"
              v-model="address.building"
              placeholder="Введите номер дома"
              required
            />
          </div>
          <div class="address-form__input address-form__input--size--small">
            <AppInput
              label="Квартира"
              name="addr-apartment"
              v-model="address.flat"
              placeholder="Введите № квартиры"
            />
          </div>
          <div class="address-form__input">
            <AppInput
              label="Комментарий"
              name="addr-comment"
              v-model="address.comment"
              placeholder="Введите комментарий"
            />
          </div>
        </div>

        <div class="address-form__buttons">
          <button
            v-if="addressToEdit"
            class="button button--transparent"
            type="button"
            @click="deleteAddress"
          >
            Удалить
          </button>
          <button
            v-else
            class="button button--transparent"
            type="button"
            @click="$emit('cancel')"
          >
            Закрыть
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
  // Без наблюдателя при удалении задачи, у последующей за удаленной задаче this.address становится, как у удаленной. При этом addressToEdit в компоненте корректный
  // Кажется что проблема с key, но возможно vue просто так работает 🤔
  watch: {
    addressToEdit(value) {
      this.address = cloneDeep(value);
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
    ...mapActions("Addresses", ["delete", "post", "put"]),
    async saveAddress() {
      if (this.addressToEdit) {
        await this.put({
          ...this.address,
          userId: this.user.id,
        });
      } else {
        await this.post({
          ...this.address,
          userId: this.user.id,
        });
        this.$emit("save");
      }

      this.isEdit = false;
    },
    async deleteAddress() {
      await this.delete(this.address.id);
      this.isEdit = false;
    },
  },
};
</script>
