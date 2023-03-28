<template>
	<main class="content">
		<form action="#" method="post">
			<div class="content__wrapper">
				<h1 class="title title--big">Конструктор пиццы</h1>

				<dough-selector :items="dataStore.doughs" v-model="pizzaStore.doughId" />

				<size-selector :items="dataStore.sizes" v-model="pizzaStore.sizeId" />

				<div class="content__ingredients">
					<div class="sheet">
						<h2 class="title title--small sheet__title">Выберите ингредиенты</h2>

						<div class="sheet__content ingredients">

							<sauce-selector :items="dataStore.sauces" v-model="pizzaStore.sauceId" />

							<ingredients-selector
								:items="dataStore.ingredients"
								:values="pizzaStore.ingredients"
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
							@click="addToCart"
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
import { reactive, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

import { useDataStore } from '@/stores/data';
import { usePizzaStore } from '@/stores/pizza';
import { useCartStore } from '@/stores/cart';

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

const router = useRouter();

const dataStore = useDataStore();
const pizzaStore = usePizzaStore();
const cartStore = useCartStore();

// const doughItems = doughJSON.map(normalizeDough);
// const sizeItems = sizeJSON.map(normalizeSize);
// const sauceItems = sauceJSON.map(normalizeSauces);
// const ingredientItems = ingredientJSON.map(normalizeIngredients);

const resetPizza = () => {
	pizzaStore.setName('');
	pizzaStore.setDough(dataStore.doughs[0].id);
	pizzaStore.setSize(dataStore.sizes[0].id);
	pizzaStore.setSauce(dataStore.sauces[0].id);
	pizzaStore.setIngredients([]);
};

const addToCart = async () => {
	cartStore.savePizza(pizzaStore.$state);
	await router.push({ name: 'cart' });
	resetPizza();
};

const name = computed({
	get() {
		return pizzaStore.name;
	},
	set(value) {
		pizzaStore.setName(value);
	},
});

const doughId = computed({
	get() {
		return pizzaStore.doughId;
	},
	set(value) {
		pizzaStore.setDough(value);
	},
});

const sizeId = computed({
	get() {
		return pizzaStore.sizeId;
	},
	set(value) {
		pizzaStore.setSize(value);
	},
});

const sauceId = computed({
	get() {
		return pizzaStore.sauceId;
	},
	set(value) {
		pizzaStore.setSauce(value);
	},
});

onMounted(() => {
	if (pizzaStore.index === null) {
		resetPizza();
	}
});

const disableSubmit = computed(() => {
	return name.value.length === 0 || pizzaStore.price === 0;
});

const addIngredient = (key) => {
	pizza.ingredients[key]++;
};

const pushIngredient = (key, count) => {
	pizza.ingredients[key] = count;
};
</script>
