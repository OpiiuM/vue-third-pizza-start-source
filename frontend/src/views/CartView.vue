<template>
	<form
		action="#"
		method="post"
		class="layout-form"
		@submit.prevent="submit"
	>
		<main class="content cart">
			<div class="container">

				<div class="cart__title">
					<h1 class="title title--big">Корзина</h1>
				</div>

				<div
					v-if="cartStore.pizzasExtended.length === 0"
					class="sheet cart__empty"
				>
					<p>В корзине нет ни одного товара</p>
				</div>

				<ul
					v-else
					class="cart-list sheet"
				>
					<li
						v-for="(pizza, i) in cartStore.pizzasExtended"
						:key="i"
						class="cart-list__item"
					>
						<div class="product cart-list__product">
							<img
								:src="getImage('product.svg')"
								class="product__img"
								width="56"
								height="56"
								:alt="pizza.name"
							/>
							<div class="product__text">
								<h2>{{ pizza.name }}</h2>
								<ul>
									<li>{{ pizza.size.name }}, на {{ pizza.dough.name }} тесто</li>
									<li>Соус: {{ pizza.sauce.name }}</li>
									<li>
										Начинка:
										{{ pizza.ingredients.map((i) => i.name).join(', ') }}
									</li>
								</ul>
							</div>
						</div>

						<app-counter
							class="cart-list__counter"
							:value="pizza.quantity"
							accent
							@input="cartStore.setPizzaQuantity(i, $event)"
						/>

						<div class="cart-list__price">
							<b>{{ pizza.price }}</b>
						</div>

						<div class="cart-list__button">
							<button 
								type="button"
								class="cart-list__edit"
								@click="editPizza(i)"
							>
								Изменить
							</button>
						</div>
					</li>
				</ul>

				<div
          v-if="cartStore.pizzas.length > 0"
          class="cart__additional"
        >
					<ul class="additional-list">
						<li
							v-for="misc in cartStore.miscExtended"
							:key="misc.id"
							class="additional-list__item sheet"
						>
							<p class="additional-list__description">
								<img
									:src="getPublicImage(misc.image)"
									width="39"
									height="60"
									:alt="misc.name"
								/>
								<span>{{ misc.name }}</span>
							</p>

							<div class="additional-list__wrapper">
								<app-counter
									class="additional-list__counter"
									:value="misc.quantity"
									accent
									@input="cartStore.setMiscQuantity(misc.id, $event)"
								/>

								<div class="additional-list__price">
									<b>× {{ misc.price }} ₽</b>
								</div>
							</div>
						</li>
					</ul>
				</div>

				<div
          v-if="cartStore.pizzas.length > 0"
          class="cart__form"
        >
					<div class="cart-form">
						<label class="cart-form__select">
							<span class="cart-form__label">Получение заказа:</span>

							<select
								name="test"
								class="select"
								@input="deliveryOption = $event.target.value"
							>
								<option value="self">Заберу сам</option>
								<option value="new">Новый адрес</option>
								<option value="home">Дом</option>
							</select>
						</label>

						<app-input
							v-model="phone"
							label="Контактный телефон:"
							:modificators="['big-label']"
							type="text"
							name="tel"
							placeholder="+7 999-999-99-99"
						/>

						<div
							v-if="deliveryOption === 'new'"
							class="cart-form__address"
						>
							<span class="cart-form__label">Новый адрес:</span>

							<div class="cart-form__input">
								<app-input
									v-model="street"
									label="Улица*"
									type="text"
									name="street"
									required
								/>
							</div>

							<div class="cart-form__input cart-form__input--small">
								<app-input
									v-model="building"
									label="Дом*"
									type="text"
									name="house"
									required
								/>
							</div>

							<div class="cart-form__input cart-form__input--small">
								<app-input
									v-model="flat"
									label="Квартира"
									type="text"
									name="apartment"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>

		<section
      v-if="cartStore.pizzas.length > 0"
      class="footer"
    >
			<div class="footer__more">
				<router-link :to="{ name: 'home' }" class="button button--border button--arrow">
					Хочу еще одну
				</router-link>
			</div>

			<p class="footer__text">
				Перейти к конструктору<br />чтоб собрать ещё одну пиццу
			</p>

			<div class="footer__price">
				<b>Итого: {{ cartStore.total }} ₽</b>
			</div>

			<div class="footer__submit">
				<button
					type="submit"
					class="button"
					:disabled="cartStore.total === 0"
				>
					Оформить заказ
				</button>
			</div>
		</section>
	</form>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

import { useCartStore, usePizzaStore, useProfileStore } from '@/stores';

import AppInput from '@/common/components/AppInput.vue';
import AppCounter from '@/common/components/AppCounter.vue';

import { getPublicImage } from '@/common/helpers/public-image';

const router = useRouter();

const cartStore = useCartStore();
const pizzaStore = usePizzaStore();
const profileStore = useProfileStore();

const deliveryOption = ref('self');

const phone = computed({
	get() {
		return cartStore.phone;
	},
	set(value) {
		cartStore.setPhone(value);
	},
});

const street = computed({
	get() {
		return cartStore.address.street;
	},
	set(value) {
		cartStore.setStreet(value);
	},
});

const building = computed({
	get() {
		return cartStore.address.building;
	},
	set(value) {
		cartStore.setBuilding(value);
	},
});

const flat = computed({
	get() {
		return cartStore.address.flat;
	},
	set(value) {
		cartStore.setFlat(value);
	},
});

const editPizza = async (index) => {
	pizzaStore.loadPizza({
		index,
		...cartStore.pizzas[index],
	});

	await router.push({ name: 'home' });
};

const submit = async () => {
	if (deliveryOption.value === 'home') {
		cartStore.setAddress(profileStore.addresses[0]);
	}

	await router.push({ name: 'success' });
};

const getImage = (image) => {
	return new URL(`../assets/img/${image}`, import.meta.url).href;
};
</script>
