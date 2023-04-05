<template>
	<main
    v-if="dataStore.isDataLoaded"
    class="content"
  >
		<form action="#" method="post">
			<div class="content__wrapper">
				<h1 class="title title--big">Конструктор пиццы</h1>

				<dough-selector
					v-model="doughId"
					:items="dataStore.doughs"
				/>

				<size-selector
					v-model="sizeId"
					:items="dataStore.sizes"
				/>

				<div class="content__ingredients">
					<div class="sheet">
						<h2 class="title title--small sheet__title">Выберите ингредиенты</h2>

						<div class="sheet__content ingredients">

							<sauce-selector
								v-model="sauceId"
								:items="dataStore.sauces"
							/>

							<ingredients-selector
								:values="pizzaStore.ingredientQuantities"
								:items="dataStore.ingredients"
								@update="pizzaStore.setIngredientQuantity"
							/>

						</div>
					</div>
				</div>

				<div class="content__pizza">
					<app-input
						v-model="name"
						label="Название пиццы"
						labelHidden
						type="text"
						name="pizza_name"
						placeholder="Введите название пиццы"
					/>

					<pizza-view
						:dough="pizzaStore.dough.value"
						:sauce="pizzaStore.sauce.value"
						:ingredients="pizzaStore.ingredientsExtended"
						@drop="pizzaStore.incrementIngredientQuantity"
					/>

					<div class="content__result">
						<p>Итого: {{ pizzaStore.price }} ₽</p>
						<button
							type="button"
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
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

import { useDataStore, usePizzaStore, useCartStore } from '@/stores';

import AppInput from '@/common/components/AppInput.vue';
import DoughSelector from '@/modules/constructor/ConstructorDoughSelector.vue';
import SizeSelector from '@/modules/constructor/ConstructorSizeSelector.vue';
import SauceSelector from '@/modules/constructor/ConstructorSauceSelector.vue';
import IngredientsSelector from '@/modules/constructor/ConstructorIngredientsSelector.vue';
import PizzaView from '@/modules/constructor/ConstructorPizzaView.vue';

const router = useRouter();

const dataStore = useDataStore();
const pizzaStore = usePizzaStore();
const cartStore = useCartStore();

const resetPizza = () => {
  pizzaStore.setName('');

  if (dataStore.isDataLoaded) {
    pizzaStore.setDough(dataStore.doughs[0].id);
    pizzaStore.setSize(dataStore.sizes[0].id);
    pizzaStore.setSauce(dataStore.sauces[0].id);
  }

  pizzaStore.setIngredients([]);
};

const addToCart = async () => {
	cartStore.savePizza(pizzaStore.$state);
	await router.push({ name: 'cart' });
	resetPizza();
};

onMounted(() => {
	if (pizzaStore.index === null) {
		resetPizza();
	}
});

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

const disableSubmit = computed(() => {
	return name.value.length === 0 || pizzaStore.price === 0;
});
</script>
