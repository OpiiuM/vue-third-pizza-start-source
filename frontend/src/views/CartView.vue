<template>
	<form action="#" method="post" class="layout-form">
		<main class="content cart">
			<div class="container">

				<div class="cart__title">
					<h1 class="title title--big">Корзина</h1>
				</div>

				<!-- <div class="sheet cart__empty">
            <p>В корзине нет ни одного товара</p>
          </div> -->

				<ul class="cart-list sheet">
					<li class="cart-list__item">
						<div class="product cart-list__product">
							<img :src="getImage('product.svg')" class="product__img" width="56" height="56" alt="Капричоза" />
							<div class="product__text">
								<h2>Капричоза</h2>
								<ul>
									<li>30 см, на тонком тесте</li>
									<li>Соус: томатный</li>
									<li>Начинка: грибы, лук, ветчина, пармезан, ананас</li>
								</ul>
							</div>
						</div>

						<app-counter
							class="cart-list__counter"
							:value="value"
							accent
							@input="value = $event"
						/>

						<div class="cart-list__price">
							<b>782 ₽</b>
						</div>

						<div class="cart-list__button">
							<button 
								type="button"
								class="cart-list__edit"
							>
								Изменить
							</button>
						</div>
					</li>
					<li class="cart-list__item">
						<div class="product cart-list__product">
							<img
								:src="getImage('product.svg')"
								class="product__img"
								width="56"
								height="56"
								alt="Любимая пицца"
							/>
							<div class="product__text">
								<h2>Любимая пицца</h2>
								<ul>
									<li>30 см, на тонком тесте</li>
									<li>Соус: томатный</li>
									<li>
										Начинка: грибы, лук, ветчина, пармезан, ананас, бекон, блю
										чиз
									</li>
								</ul>
							</div>
						</div>

						<app-counter
							class="cart-list__counter"
							:value="value"
							accent
							@input="value = $event"
						/>

						<div class="cart-list__price">
							<b>782 ₽</b>
						</div>

						<div class="cart-list__button">
							<button
								type="button"
								class="cart-list__edit"
							>
								Изменить
							</button>
						</div>
					</li>
				</ul>

				<div class="cart__additional">
					<ul class="additional-list">
						<li class="additional-list__item sheet">
							<p class="additional-list__description">
								<img
									:src="getImage('cola.svg')"
									width="39"
									height="60"
									alt="Coca-Cola 0,5 литра"
								/>
								<span>Coca-Cola 0,5 литра</span>
							</p>

							<div class="additional-list__wrapper">
								<app-counter
									class="additional-list__counter"
									:value="value"
									accent
									@input="value = $event"
								/>

								<div class="additional-list__price">
									<b>× 56 ₽</b>
								</div>
							</div>
						</li>
						<li class="additional-list__item sheet">
							<p class="additional-list__description">
								<img
									:src="getImage('sauce.svg')"
									width="39"
									height="60"
									alt="Острый соус"
								/>
								<span>Острый соус</span>
							</p>

							<div class="additional-list__wrapper">
								<app-counter
									class="additional-list__counter"
									:value="value"
									accent
									@input="value = $event"
								/>

								<div class="additional-list__price">
									<b>× 30 ₽</b>
								</div>
							</div>
						</li>
						<li class="additional-list__item sheet">
							<p class="additional-list__description">
								<img
									:src="getImage('potato.svg')"
									width="39"
									height="60"
									alt="Картошка из печи"
								/>
								<span>Картошка из печи</span>
							</p>

							<div class="additional-list__wrapper">
								<app-counter
									class="additional-list__counter"
									:value="value"
									accent
									@input="value = $event"
								/>

								<div class="additional-list__price">
									<b>× 56 ₽</b>
								</div>
							</div>
						</li>
					</ul>
				</div>

				<div class="cart__form">
					<div class="cart-form">
						<label class="cart-form__select">
							<span class="cart-form__label">Получение заказа:</span>

							<select name="test" class="select">
								<option value="1">Заберу сам</option>
								<option value="2">Новый адрес</option>
								<option value="3">Дом</option>
							</select>
						</label>

						<app-input
							v-model="state.phone"
							label="Контактный телефон:"
							:modificators="['big-label']"
							type="text"
							name="tel"
							placeholder="+7 999-999-99-99"
						/>

						<div class="cart-form__address">
							<span class="cart-form__label">Новый адрес:</span>

							<div class="cart-form__input">
								<app-input
									v-model="state.street"
									label="Улица*"
									type="text"
									name="street"
								/>
							</div>

							<div class="cart-form__input cart-form__input--small">
								<app-input
									v-model="state.house"
									label="Дом*"
									type="text"
									name="house"
								/>
							</div>

							<div class="cart-form__input cart-form__input--small">
								<app-input
									v-model="state.apartment"
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

		<section class="footer">
			<div class="footer__more">
				<router-link :to="{ name: 'home' }" class="button button--border button--arrow">
					Хочу еще одну
				</router-link>
			</div>

			<p class="footer__text">
				Перейти к конструктору<br />чтоб собрать ещё одну пиццу
			</p>

			<div class="footer__price">
				<b>Итого: 2 228 ₽</b>
			</div>

			<div class="footer__submit">
				<button type="submit" class="button">Оформить заказ</button>
			</div>
		</section>
	</form>
</template>

<script setup>
import { ref, reactive } from 'vue';

import AppInput from '@/common/components/AppInput.vue';
import AppCounter from '@/common/components/AppCounter.vue';

const value = ref(0);

const state = reactive({
	phone: '',
	street: '',
	house: '',
	apartment: '',
});

const getImage = (image) => {
	return new URL(`../assets/img/${image}`, import.meta.url).href;
};
</script>
