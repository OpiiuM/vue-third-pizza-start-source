<template>
	<label class="input" :class="inputClass">
		<span :class="labelClass">{{ label }}</span>

		<input
			v-bind="$attrs"
			:value="modelValue"
			@input="$emit('update:modelValue', $event.target.value)"
		/>
	</label>
</template>

<script>
import { defineComponent, computed } from 'vue';

export default defineComponent({
	inheritAttrs: false,

	props: {
		modelValue: {
			type: String,
			required: true,
		},

		label: {
			type: String,
			required: true,
			validator(value) {
				return !!value.trim();
			},
		},

		labelHidden: {
			type: Boolean,
			default: false,
		},

		modificators: {
			type: Array,
			default: () => [],
		},
	},

	setup(props) {
		const inputClass = computed(() => {
			return props.modificators.map((mod) => `input--${mod}`);
		});

		const labelClass = computed(() => {
			return {
				'visually-hidden': props.labelHidden,
			};
		});

		return {
			inputClass,
			labelClass,
		};
	},
});
</script>
