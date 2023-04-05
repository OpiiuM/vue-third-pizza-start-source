<template>
	<app-popup>
		<router-link :to="{ name: 'orders' }" class="close">
			<span class="visually-hidden">Закрыть поп-ап</span>
		</router-link>

		<app-popup-title>Спасибо за заказ</app-popup-title>
		<p>Мы начали готовить Ваш заказ, скоро привезем его вам ;)</p>

		<div class="popup__button">
			<router-link :to="{ name: 'orders' }" class="button">
				Отлично, я жду!
			</router-link>
		</div>
	</app-popup>	
</template>

<script setup>
import { computed } from 'vue';
import { useAuthStore } from '@/stores';

import AppPopup from '@/common/components/popup/AppPopup.vue';
import AppPopupTitle from '@/common/components/popup/AppPopupTitle.vue';

const authStore = useAuthStore();

const redirectRouteName = computed(() => {
  authStore.isAuthenticated ? 'orders' : 'home';
});
</script>

<style lang="scss" scoped>
.popup__button {
	& a {
		padding: 16px 32px;
	}
}
</style>
