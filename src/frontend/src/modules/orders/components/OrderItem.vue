<template>
  <section class="sheet order">
    <div class="order__wrapper">
      <div class="order__number">
        <b>Заказ #{{ order.id }}</b>
      </div>

      <div class="order__sum">
        <span>Сумма заказа: {{ orderPrice }} ₽</span>
      </div>

      <div class="order__button">
        <button
          class="button button--border"
          type="button"
          @click="$emit('delete', order.id)"
        >
          Удалить
        </button>
      </div>
      <div class="order__button">
        <button class="button" type="button" @click="$emit('repeat', order)">
          Повторить
        </button>
      </div>
    </div>

    <ul class="order__list">
      <li v-for="pizza in order.pizzas" :key="pizza.id" class="order__item">
        <div class="product">
          <img
            class="product__img"
            src="@/assets/img/product.svg"
            :alt="pizza.name"
            width="56"
            height="56"
          />
          <div class="product__text">
            <h2>{{ pizza.name }}</h2>
            <ul>
              <li>
                {{ pizza.size.name }}, на
                {{ pizza.dough.name.toLowerCase().replace(/.$/, "м") }} тесте
              </li>
              <li>Соус: {{ pizza.sauce.name.toLowerCase() }}</li>
              <li>
                Начинка:
                {{
                  pizza.ingredients
                    .reduce(
                      (prev, next) => [...prev, next.name.toLowerCase()],
                      []
                    )
                    .join(", ")
                }}
              </li>
            </ul>
          </div>
        </div>

        <p class="order__price">
          {{ pizza.quantity > 1 ? `${pizza.quantity}х` : ``
          }}{{ pizza.price }} ₽
        </p>
      </li>
    </ul>

    <ul v-if="order.misc" class="order__additional">
      <li v-for="misc in order.misc" :key="misc.id">
        <img :src="misc.image" :alt="misc.name" width="20" height="30" />
        <p>
          <span>{{ misc.name }}</span>
          <b>
            {{ misc.quantity > 1 ? `${misc.quantity}х` : `` }}{{ misc.price }} ₽
          </b>
        </p>
      </li>
    </ul>

    <p v-if="order.address" class="order__address">
      Адрес доставки:
      {{
        order.addressId
          ? order.address.name
          : `${order.address.string}, ${order.address.building}, ${order.address.flat}`
      }}
    </p>
  </section>
</template>

<script>
import { getOrderPrice } from "@/common/helpers";

export default {
  name: "OrderItem",
  props: {
    order: {
      type: Object,
      required: true,
    },
  },
  computed: {
    orderPrice() {
      return getOrderPrice(this.order);
    },
  },
};
</script>
