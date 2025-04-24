import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { useAuthStore } from '../store/auth.store';
import { AuthStatus } from '../interfaces/auth-status.enum';

const isAuthenticatedGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  const authStore = useAuthStore();

  console.log(authStore.authStatus);
  await authStore.checkAuthStatus();

  if (authStore.authStatus === AuthStatus.UnAuthenticated) {
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

export default isAuthenticatedGuard;
