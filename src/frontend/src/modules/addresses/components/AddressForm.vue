<template>
  <div class="sheet address-form" :class="{ 'address-form--opened': isEdit }">
    <div class="address-form__header">
      <b>
        Адрес №{{ number }}.
        <template v-if="!isEdit">{{ address.name }}</template>
      </b>
      <div v-if="!isEdit" class="address-form__edit">
        <button
          class="icon"
          type="button"
          data-test="edit-button"
          @click="isEdit = true"
        >
          <span class="visually-hidden">Изменить адрес</span>
        </button>
      </div>
    </div>

    <template v-if="isEdit">
      <form data-test="address-form" @submit.prevent="saveAddress">
        <div class="address-form__wrapper">
          <div class="address-form__input">
            <AppInput
              label="Название адреса"
              name="addr-name"
              v-model="address.name"
              :error-text="validations.name.error"
              placeholder="Введите название адреса"
              required
              data-test="name-component"
            />
          </div>
          <div class="address-form__input address-form__input--size--normal">
            <AppInput
              label="Улица"
              name="addr-street"
              v-model="address.street"
              :error-text="validations.street.error"
              placeholder="Введите название улицы"
              required
              data-test="street-component"
            />
          </div>
          <div class="address-form__input address-form__input--size--small">
            <AppInput
              label="Дом"
              name="addr-house"
              v-model="address.building"
              :error-text="validations.building.error"
              placeholder="Введите номер дома"
              required
              data-test="building-component"
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
            data-test="delete-button"
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
      <p>
        {{ address.street }}, д. {{ address.building
        }}{{ address.flat ? `, кв. ${address.flat}` : `` }}
      </p>
      <small v-if="address.comment">{{ address.comment }}</small>
    </template>
  </div>
</template>

<script>
import { cloneDeep } from "lodash";
import { mapState, mapActions } from "vuex";
import validator from "@/common/mixins/validator";

const createNewAddress = () => ({
  name: "",
  street: "",
  building: "",
  flat: "",
  comment: "",
});

export default {
  name: "AddressForm",
  mixins: [validator],
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
      validations: {
        name: {
          error: "",
          rules: ["required"],
        },
        street: {
          error: "",
          rules: ["required"],
        },
        building: {
          error: "",
          rules: ["required"],
        },
      },
    };
  },
  watch: {
    address: {
      deep: true,
      handler() {
        this.$clearValidationErrors();
      },
    },
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
      const { name, street, building } = this.address;

      if (!this.$validateFields({ name, street, building }, this.validations)) {
        return;
      }

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
