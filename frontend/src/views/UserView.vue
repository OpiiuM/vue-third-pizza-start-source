<template>
	<sidebar-layout>
		<template #sidebar>
			<router-link
				:to="{ name: 'orders' }"
				class="layout__link"
				active-class="layout__link--active"
				exact-path
			>
				История заказов
			</router-link>
			<router-link
				:to="{ name: 'profile' }"
				class="layout__link"
				active-class="layout__link--active"
				exact-path
			>
				Мои данные
			</router-link>
		</template>

		<router-view />
	</sidebar-layout>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import SidebarLayout from '@/layouts/SidebarLayout.vue';

const route = useRoute();

const routeName = computed(() => route.name);
</script>
