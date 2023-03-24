<template>
	<div class="ingredients__filling">
		<p>Начинка:</p>

		<ul class="ingredients__list">
			<li
				v-for="ingredient in items"
				:key="ingredient.id"
				class="ingredients__item"
			>
				<app-drag
					:data-transfer="ingredient"
					:draggable="getValue(ingredient.value) < MAX_INGREDIENT_COUNT"
				>
					<span
						class="filling"
						:class="`filling--${ingredient.value}`"
					>
						{{ ingredient.name }}
					</span>
				</app-drag>

				<!-- CountPicker -->
				<div class="counter counter--orange ingredients__counter">
					<button
						type="button"
						class="counter__button counter__button--minus"
						:disabled="getValue(ingredient) === 0"
						@click="decrementValue(ingredient.value)"
					>
						<span class="visually-hidden">Меньше</span>
					</button>
					<input
						type="text"
						name="counter"
						class="counter__input"
						:value="getValue(ingredient.value)"
						@input="inputValue(ingredient.value, $event.target.value)"
					/>
					<button
						type="button"
						class="counter__button counter__button--plus"
						:disabled="getValue(ingredient.value) === MAX_INGREDIENT_COUNT"
						@click="incrementValue(ingredient.value)"
					>
						<span class="visually-hidden">Больше</span>
					</button>
				</div>
				<!-- /CountPicker -->
			</li>
		</ul>

	</div>
</template>

<script setup>
import { toRef } from 'vue';

import AppDrag from '@/common/components/AppDrag.vue';

import { MAX_INGREDIENT_COUNT } from '@/common/constants';

const props = defineProps({
	values: {
		type: Object,
		default: () => ({}),
	},
	items: {
		type: Array,
		default: () => [],
	},
});

const emit = defineEmits(['update']);
const values = toRef(props, 'values');

const getValue = (ingredient) => {
	return values.value[ingredient] ?? 0;
};

const setValue = (ingredient, count) => {
	emit('update', ingredient, Number(count));
};

const decrementValue = (ingredient) => {
	setValue(ingredient, getValue(ingredient) - 1);
};

const incrementValue = (ingredient) => {
	setValue(ingredient, getValue(ingredient) + 1);
};

const inputValue = (ingredient, count) => {
	return setValue(ingredient, Math.min(MAX_INGREDIENT_COUNT, Number(count)));
};
</script>
