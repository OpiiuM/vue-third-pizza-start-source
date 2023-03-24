<template>
	<label class="input">
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

	setup(props, context) {
		console.log('context', context);

		const labelClass = computed(() => {
			const cssClasses = props.modificators.map((mod) => `input--${mod}`);
			
			return {
				'visually-hidden': props.labelHidden,
				...cssClasses,
			};
		});

		return {
			labelClass,
		};
	},
});
</script>
