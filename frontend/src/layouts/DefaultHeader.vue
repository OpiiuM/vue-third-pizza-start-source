<template>
	<header class="header">
		<div class="header__logo">
			<router-link :to="{ name: 'home' }" class="logo">
				<img
					src="@/assets/img/logo.svg"
					alt="V!U!E! Pizza logo"
					width="90"
					height="40"
				/>
			</router-link>
		</div>
		<div class="header__cart">
			<router-link :to="{ name: 'cart' }">
        {{ cartStore.total }} ₽
      </router-link>
		</div>
		<div class="header__user">
			<router-link v-if="authStore.isAuthenticated" :to="{ name: 'profile' }">
        <img
          :src="getPublicImage(authStore.user.avatar)"
          :alt="authStore.user.name"
          width="32"
          height="32"
        />
				<span>{{ authStore.user.name }}</span>
			</router-link>
      <div
        v-if="authStore.isAuthenticated"
        class="header__logout"
        @click="logout"
      >
        <span>Выйти</span>
      </div>
			<router-link
        v-else
        :to="{ name: 'login' }"
        class="header__logout"
      >
				<span>Войти</span>
			</router-link>
		</div>
	</header>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAuthStore, useCartStore } from '@/stores';

import { getPublicImage } from '@/common/helpers/public-image';

const router = useRouter();
const authStore = useAuthStore();
const cartStore = useCartStore();

const logout = async () => {
  await authStore.logout();
  await router.replace({ name: 'login' });
};
</script>
