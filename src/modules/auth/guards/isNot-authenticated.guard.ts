import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { useAuthStore } from '../store/auth.store';
import { AuthStatus } from '../interfaces/auth-status.enum';

const isNotAuthenticatedGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  const authStore = useAuthStore();

  await authStore.checkAuthStatus();
  console.log(authStore.authStatus);
  if (authStore.authStatus === AuthStatus.Authenticated) {
    return next({ name: 'home' });
  } else {
    return next();
  }

  // const userId = localStorage.getItem('userId');
  // localStorage.setItem('lastPath', to.path);

  // if (!userId) {
  //   return next({
  //     name: 'login',
  //   });
  // }

  // return next();
};

export default isNotAuthenticatedGuard;
