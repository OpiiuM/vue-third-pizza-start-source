<template>
	<div class="content__diameter">
		<div class="sheet">
			<h2 class="title title--small sheet__title">Выберите размер</h2>

			<div class="sheet__content diameter">
				<!-- TODO: ConstructorRadioButton.vue -->
				<label
					v-for="size in items"
					:key="size.id"
					class="diameter__input"
					:class="`diameter__input--${size.value}`"
				>
					<input
						type="radio"
						name="diameter"
						:value="size.value"
						:checked="size.value === modelValue"
						class="visually-hidden"
						@input="$emit('update:modelValue', size.value)"
					/>
					<span>{{ size.name }}</span>
				</label>
			</div>

		</div>
	</div>
</template>

<script setup>
defineProps({
	modelValue: {
		type: String,
		default: '',
	},
	items: {
		type: Array,
		default: () => [],
	},
});

defineEmits(['update:modelValue']);
</script>
