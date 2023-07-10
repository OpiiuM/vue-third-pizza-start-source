import { createRouter, createWebHistory } from 'vue-router';
import { routes } from './routes';
import { middlewarePipeline } from '@/middlewares/middlewarePipeline';

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

middlewarePipeline(router);
