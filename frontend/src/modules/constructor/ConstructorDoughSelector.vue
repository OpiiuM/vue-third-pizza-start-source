<template>
	<div class="content__dough">
		<div class="sheet">
			<h2 class="title title--small sheet__title">Выберите тесто</h2>

			<div class="sheet__content dough">
				<label
					v-for="dough in items"
					:key="dough.id"
					class="dough__input"
					:class="`dough__input--${dough.value}`"
				>
					<input
						type="radio"
						name="dough"
						:value="dough.id"
						:checked="dough.id === modelValue"
						class="visually-hidden"
						@input="$emit('update:modelValue', dough.id)"
					/>
					<b>{{ dough.name }}</b>
					<span>{{ dough.description }}</span>
				</label>
			</div>

		</div>
	</div>
</template>

<script setup>
defineProps({
	modelValue: {
		type: Number,
		required: true,
	},
	items: {
		type: Array,
		default: () => [],
	},
});

defineEmits(['update:modelValue']);
</script>
