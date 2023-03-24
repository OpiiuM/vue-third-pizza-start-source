<template>
	<main class="content">
		<form action="#" method="post">
			<div class="content__wrapper">
				<h1 class="title title--big">Конструктор пиццы</h1>

				<dough-selector :items="doughItems" v-model="pizza.doughValue" />

				<size-selector :items="sizeItems" v-model="pizza.sizeValue" />

				<div class="content__ingredients">
					<div class="sheet">
						<h2 class="title title--small sheet__title">Выберите ингредиенты</h2>

						<div class="sheet__content ingredients">

							<sauce-selector :items="sauceItems" v-model="pizza.sauceValue" />

							<ingredients-selector
								:items="ingredientItems"
								:values="pizza.ingredients"
								@update="pushIngredient"
							/>

						</div>
					</div>
				</div>

				<div class="content__pizza">
					<label class="input">
						<span class="visually-hidden">Название пиццы</span>
						<input
							v-model="pizza.name"
							type="text"
							name="pizza_name"
							placeholder="Введите название пиццы"
						/>
					</label>

					<pizza-view
						:dough="pizza.dough"
						:sauce="pizza.sauce"
						:ingredients="pizza.ingredients"
						@drop="addIngredient"
					/>

					<div class="content__result">
						<p>Итого: {{ price }} ₽</p>
						<button
							type="submit"
							class="button"
							:disabled="disableSubmit"
						>
							Готовьте!
						</button>
					</div>
				</div>

			</div>
		</form>
	</main>
</template>

<script setup>
import { reactive, computed } from 'vue';

import DoughSelector from '@/modules/constructor/ConstructorDoughSelector.vue';
import SizeSelector from '@/modules/constructor/ConstructorSizeSelector.vue';
import SauceSelector from '@/modules/constructor/ConstructorSauceSelector.vue';
import IngredientsSelector from '@/modules/constructor/ConstructorIngredientsSelector.vue';
import PizzaView from '@/modules/constructor/ConstructorPizzaView.vue';

import doughJSON from '@/mocks/dough.json';
import sizeJSON from '@/mocks/sizes.json';
import sauceJSON from '@/mocks/sauces.json';
import ingredientJSON from '@/mocks/ingredients.json';
import {
	normalizeDough,
	normalizeSize,
	normalizeSauces,
	normalizeIngredients,
} from '@/common/helpers/normalize';

const doughItems = doughJSON.map(normalizeDough);
const sizeItems = sizeJSON.map(normalizeSize);
const sauceItems = sauceJSON.map(normalizeSauces);
const ingredientItems = ingredientJSON.map(normalizeIngredients);

const pizza = reactive({
	name: '',
	dough: doughItems[0].value,
	size: sizeItems[0].value,
	sauce: sauceItems[0].value,
	ingredients: ingredientItems.reduce((acc, item) => {
		acc[item.value] = 0;
		return acc;
	}, {}),
});

const price = computed(() => {
	const { dough, size, sauce, ingredients } = pizza;

	const sizeMultiplier = sizeItems.find((item) => item.value === size)?.multiplier ?? 1;
	const doughPrice = doughItems.find((item) => item.value === dough)?.price ?? 0;
	const saucePrice = sauceItems.find((item) => item.value === sauce)?.price ?? 0;
	const ingredientsPrice = ingredientItems
			.map((item) => ingredients[item.value] * item.price)
			.reduce((acc, item) => acc + item, 0);

	return (doughPrice + saucePrice + ingredientsPrice) * sizeMultiplier;
});

const disableSubmit = computed(() => {
	return pizza.name.length === 0 || price.value === 0;
});

const addIngredient = (key) => {
	pizza.ingredients[key]++;
};

const pushIngredient = (key, count) => {
	pizza.ingredients[key] = count;
};
</script>
