<template>
	<div class="layout__title">
    <h1 class="title title--big">История заказов</h1>
  </div>

  <section
    v-for="order in profileStore.ordersExtended"
    :key="order.id"
    class="sheet order"
  >
    <div class="order__wrapper">
      <div class="order__number">
        <b>Заказ #{{ order.id }}</b>
      </div>

      <div class="order__sum">
        <span>Сумма заказа: {{ order.total }} ₽</span>
      </div>

      <div class="order__button">
        <button
          type="button"
          class="button button--border"
          @click="profileStore.removeOrder(order.id)"
        >
          Удалить
        </button>
      </div>
      <div class="order__button">
        <button
          type="button"
          class="button"
          @click="loadOrder(order)"
        >
          Повторить
        </button>
      </div>
    </div>

    <ul class="order__list">
      <li
        v-for="pizza in order?.orderPizzas"
        :key="pizza.id"
        class="order__item"
      >
        <div class="product">
          <img
            :src="getPublicImage('/public/img/product.svg')"
            class="product__img"
            width="56"
            height="56"
            :alt="pizza.name"
          />
          <div class="product__text">
            <h2>{{ pizza.name }}</h2>
            <ul>
              <li>{{ pizza.size.name }}, {{ pizza.dough.name }} тесто</li>
              <li>Соус: {{ pizza.sauce.name }}</li>
              <li>
                Начинка: {{ pizza.ingredients.map((i) => i.name).join(', ') }}
              </li>
            </ul>
          </div>
        </div>

        <p class="order__price">{{ pizza.price }} ₽ x {{ pizza.quantity }}</p>
      </li>
    </ul>

    <ul class="order__additional">
      <li
        v-for="misc in order.orderMisc"
        :key="misc.id"
      >
        <img
          :src="getPublicImage(misc.image)"
          width="20"
          height="30"
          :alt="misc.name"
        />
        <p>
          <span>{{ misc.name }}&nbsp;×&nbsp;{{ misc.quantity }}</span>
          <b>{{ misc.price }} ₽</b>
        </p>
      </li>
    </ul>

    <p class="order__address">
      Адрес доставки: {{ order.orderAddress?.name }}
    </p>
  </section>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useProfileStore, useCartStore } from '@/stores';

import { getPublicImage } from '@/common/helpers/public-image';

const router = useRouter();
const profileStore = useProfileStore();
const cartStore = useCartStore();

const loadOrder = (order) => {
  cartStore.load(order);
  router.push({ name: 'cart' });
};
</script>
