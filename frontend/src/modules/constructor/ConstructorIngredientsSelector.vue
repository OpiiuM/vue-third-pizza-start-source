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
					:draggable="values[ingredient.id] < MAX_INGREDIENT_COUNT"
				>
					<span
						class="filling"
						:class="`filling--${ingredient.value}`"
					>
						{{ ingredient.name }}
					</span>
				</app-drag>

				<app-counter
					class="ingredients__counter"
					:value="values[ingredient.id]"
					:min="0"
					:max="MAX_INGREDIENT_COUNT"
					@input="inputValue(ingredient.id, $event)"
				/>
			</li>
		</ul>

	</div>
</template>

<script setup>
import AppDrag from '@/common/components/AppDrag.vue';
import AppCounter from '@/common/components/AppCounter.vue';

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

const setValue = (ingredient, count) => {
	emit('update', ingredient, Number(count));
};

const inputValue = (ingredient, count) => {
	return setValue(ingredient, Math.min(MAX_INGREDIENT_COUNT, Number(count)));
};
</script>
