<template>
	<div
		:draggable="draggable"
		@dragstart.self="onDrag"
		@dragover.prevent
		@dragenter.prevent
	>
		<slot />
	</div>
</template>

<script setup>
import { DATA_TRANSFER_PAYLOAD } from '@/common/constants';

const props = defineProps({
	draggable: {
		type: Boolean,
		default: false,
	},
	dataTransfer: {
		type: Object,
		required: true,
	},
});

const onDrag = ({ dataTransfer }) => {
	dataTransfer.setData(
		DATA_TRANSFER_PAYLOAD,
		JSON.stringify(props.dataTransfer)
	);
}
</script>
