<template>
	<default-header />
	<slot />
</template>

<script setup>
import DefaultHeader from './DefaultHeader.vue';
</script>

<style scoped>
.default-layout {
	display: flex;
	flex-direction: column;
	flex: 1;

	height: 100%;
}
</style>
