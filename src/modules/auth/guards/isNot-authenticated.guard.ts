import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { useAuthStore } from '../store/auth.store';
import { AuthStatus } from '../interfaces/auth-status.enum';

const isNotAuthenticatedGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {


  const authStore = useAuthStore();

  console.log(authStore.authStatus);

  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  authStore.authStatus === AuthStatus.Authenticated ? next({name: 'home'}) : next();


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
