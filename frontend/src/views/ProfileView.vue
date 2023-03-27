<template>
	<div class="layout__title">
		<h1 class="title title--big">Мои данные</h1>
	</div>

	<div class="user">
		<picture>
			<source
				type="image/webp"
				srcset="
					@/assets/img/users/user5@2x.webp 1x,
					@/assets/img/users/user5@4x.webp 2x
				"
			/>
			<img
				src="@/assets/img/users/user5@2x.jpg"
				srcset="@/assets/img/users/user5@4x.jpg"
				alt="Василий Ложкин"
				width="72"
				height="72"
			/>
		</picture>
		<div class="user__name">
			<span>Василий Ложкин</span>
		</div>
		<p class="user__phone">
			Контактный телефон: <span>+7 999-999-99-99</span>
		</p>
	</div>

	<div class="layout__address">
		<div class="sheet address-form">
			<div class="address-form__header">
				<b>Адрес №1. Тест</b>
				<div class="address-form__edit">
					<button type="button" class="icon">
						<span class="visually-hidden">Изменить адрес</span>
					</button>
				</div>
			</div>
			<p>Невский пр., д. 22, кв. 46</p>
			<small>Позвоните, пожалуйста, от проходной</small>
		</div>
	</div>

	<div class="layout__address">
		<form action="test.html" method="post" class="address-form address-form--opened sheet">
			<div class="address-form__header">
				<b>Адрес №1</b>
			</div>

			<div class="address-form__wrapper">
				<div class="address-form__input">

					<app-input
						v-model="state.address"
						label="Название адреса*"
						type="text"
						name="addr-name"
						placeholder="Введите название адреса"
						required
					/>

				</div>
				<div class="address-form__input address-form__input--size--normal">

					<app-input
						v-model="state.street"
						label="Улица*"
						type="text"
						name="addr-street"
						placeholder="Введите название улицы"
						required
					/>

				</div>
				<div class="address-form__input address-form__input--size--small">

					<app-input
						v-model="state.house"
						label="Дом*"
						type="text"
						name="addr-house"
						placeholder="Введите номер дома"
						required
					/>

				</div>
				<div class="address-form__input address-form__input--size--small">

					<app-input
						v-model="state.apartment"
						label="Квартира"
						type="text"
						name="addr-apartment"
						placeholder="Введите № квартиры"
					/>
					
				</div>
				<div class="address-form__input">

					<app-input
						v-model="state.comment"
						label="Комментарий"
						type="text"
						name="addr-comment"
						placeholder="Введите комментарий"
					/>

				</div>
			</div>

			<div class="address-form__buttons">
				<button type="button" class="button button--transparent">
					Удалить
				</button>
				<button type="submit" class="button">Сохранить</button>
			</div>
		</form>
	</div>

	<div class="layout__button">
		<button type="button" class="button button--border">
			Добавить новый адрес
		</button>
	</div>
</template>
  
<script setup>
import { reactive } from 'vue';

import AppInput from '@/common/components/AppInput.vue';

const state = reactive({
	address: '',
	street: '',
	house: '',
	apartment: '',
	comment: '',
});
</script>
