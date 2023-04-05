<template>
  <app-layout>
    <router-view v-if="isLoaded" />
  </app-layout>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { RouterView, useRoute, useRouter } from 'vue-router';
import { useAuthStore, useDataStore } from '@/stores';

import JwtService from '@/services/jwt/jwt.service';

import AppLayout from '@/layouts/AppLayout.vue';

const dataStore = useDataStore();
const route = useRoute();
const router = useRouter();

const isLoaded = ref(false);

const checkLoggedIn = async () => {
  const authStore = useAuthStore();
  const token = JwtService.getToken();

  if (!token) {
    isLoaded.value = true;
    return;
  }

  try {
    await authStore.whoami();
    const { redirect } = route.query;
    await router.push(redirect ? redirect : { name: "home" });
  } catch (e) {
    JwtService.destroyToken();
    console.error(e);
  } finally {
    isLoaded.value = true;
  }
};

onMounted(() => {
  checkLoggedIn();
  dataStore.loadData();
});
</script>

<style lang="scss">
@import "@/assets/scss/app.scss";

body {
  justify-content: center;
  align-items: center;
}

.main {
  &__header {
    margin-bottom: 30px;
    padding: 20px 0;

    background-color: $green-600;

    img {
      display: block;

      margin: 0 auto;
    }
  }

  &__wrapper {
    padding-bottom: 30px;

    background-color: $white;
    box-shadow: $shadow-light;

    h1 {
      margin-bottom: 0;
      padding: 0 95px;

      text-align: center;

      @include b-s36-h42;
    }

    p {
      padding: 0 95px;

      text-align: center;

      font-size: 20px;
      line-height: 30px;
    }

    b {
      font-size: 1.2em;
    }
  }
}
</style>
