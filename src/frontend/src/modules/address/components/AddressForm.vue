<template>
  <component
    :is="isEdit ? 'form' : 'div'"
    class="sheet address-form"
    :class="{ 'address-form--opened': isEdit }"
  >
    <div class="address-form__header">
      <b>
        Адрес №1.
        <template v-if="!isEdit">Тест</template>
      </b>
      <div v-if="!isEdit" class="address-form__edit">
        <button type="button" class="icon">
          <span class="visually-hidden">Изменить адрес</span>
        </button>
      </div>
    </div>

    <template v-if="isEdit">
      <div class="address-form__wrapper">
        <div class="address-form__input">
          <label class="input">
            <span>Название адреса*</span>
            <input
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
              type="text"
              name="addr-comment"
              placeholder="Введите комментарий"
            />
          </label>
        </div>
      </div>

      <div class="address-form__buttons">
        <button type="button" class="button button--transparent">
          Удалить
        </button>
        <button type="submit" class="button">Сохранить</button>
      </div>
    </template>
    <template v-else>
      <p>Невский пр., д. 22, кв. 46</p>
      <small>Позвоните, пожалуйста, от проходной</small>
    </template>
  </component>
</template>

<script>
export default {
  name: "AddressForm",
  props: {
    isEdit: Boolean,
  },
};
</script>
