import { useAuthStore } from '@/stores';

export const isLoggedIn = ({ to }) => {
  const authstore = useAuthStore();

  if (!authstore.isAuthenticated) {
    // Сохраняем маршрут, по которому пользователь намеревался перейти,
    // чтобы перенаправить на него пользователя после успешной авторизации
    return { path: '/login', query: { redirect: to.fullPath } };
  } else {
    return true;
  }
};
