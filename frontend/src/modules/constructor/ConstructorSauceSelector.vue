<template>
	<div class="ingredients__sauce">
		<p>Основной соус:</p>

		<label
			v-for="sauce in items"
			:key="sauce.id"
			class="radio ingredients__input"
		>
			<input
				type="radio"
				name="sauce"
				:value="sauce.value"
				:checked="sauce.value === modelValue"
				@input="$emit('update:modelValue', sauce.value)"
			/>

			<span>{{ sauce.name }}</span>
		</label>
	</div>
</template>

<script setup>
defineProps({
	items: {
		type: Array,
		default: () => [],
	},
	modelValue: {
		type: String,
		default: '',
	},
});

defineEmits(['update:modelValue']);
</script>
