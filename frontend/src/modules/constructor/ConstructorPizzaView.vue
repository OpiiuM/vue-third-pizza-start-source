<template>
	<div class="content__constructor">
		<app-drop @drop="$emit('drop', $event.value)">
			
			<div
				class="pizza"
				:class="`pizza--foundation--${props.dough}-${props.sauce}`"
			>
				<div class="pizza__wrapper">
					<div
						v-for="(value, key) in pizzaIngredients"
						:key="key"
						class="pizza__filling"
						:class="[
							`pizza__filling--${key}`,
							value === TWO_INGREDIENTS && 'pizza__filling--second',
							value === THREE_INGREDIENTS && 'pizza__filling--third',
						]"
					/>
				</div>
			</div>

		</app-drop>
	</div>
</template>

<script setup>
import { computed } from 'vue';

import AppDrop from '@/common/components/AppDrop.vue';

const props = defineProps({
	dough: {
		type: String,
		default: 'light',
	},
	sauce: {
		type: String,
		default: 'tomato',
	},
	ingredients: {
		type: Object,
		default: () => ({}),
	},
});

const TWO_INGREDIENTS = 2;
const THREE_INGREDIENTS = 3;

const pizzaIngredients = computed(() => {
	/*
   * ingredients - это объект с ингредиентами вида { ингредиент: количество }
   * при помощи reduce нужно оставить только те, количество которые больше 0
   * для этого перебираем каждую пару [ингредиент, количество]
   * и если количество больше 0, добавляем в объект-результат
   */
	return Object.entries(props.ingredients).reduce((result, entry) => {
		// [ингредиент, кол-во]
		const [key, value] = entry;

		if (value > 0) {
			result[key] = value;
		}

		return result;
	}, {});
});
</script>
