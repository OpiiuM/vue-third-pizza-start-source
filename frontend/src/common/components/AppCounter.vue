<template>
	<div
		class="counter ingredients__counter"
		:class="{ 'counter--orange': accent }"
	>
		<button
			type="button"
			class="counter__button counter__button--minus"
			:disabled="value === min"
			@click="emit('input', value - 1)"
		>
			<span class="visually-hidden">Меньше</span>
		</button>
		<input
			type="text"
			name="counter"
			class="counter__input"
			:value="value"
			@input="emit('input', Number($event.target.value))"
		/>
		<button
			type="button"
			class="counter__button counter__button--plus"
			:disabled="value === max"
			@click="emit('input', value + 1)"
		>
			<span class="visually-hidden">Больше</span>
		</button>
	</div>
</template>

<script lang="ts" setup>
defineProps({
	value: {
		type: Number,
		required: true,
	},
	accent: {
		type: Boolean,
		default: false,
	},
	min: {
		type: Number,
		default: 0,
	},
	max: {
		type: Number,
		default: 100,
	},
});

const emit = defineEmits(['input']);
</script>
