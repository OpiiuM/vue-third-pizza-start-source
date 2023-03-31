<template>
	<sidebar-layout>
		<template #sidebar>
			<router-link
				v-for="(link, i) in userMenu"
				:key="i"
				:to="link.to"
				class="layout__link"
				active-class="layout__link--active"
				exact-path
			>
				{{ link.label }}
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

const userMenu = [
	{
		to: { name: 'orders' },
		label: 'История заказов',
	},
	{
		to: { name: 'profile' },
		label: 'Мои данные',
	},
];
</script>
