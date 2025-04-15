import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import type { User } from '../interfaces';
import { AuthStatus } from '../interfaces/auth-status.enum';
import { loginAction } from '../action';
import { useLocalStorage } from '@vueuse/core';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | undefined>();
  //the token is save in the local storage
  const token = ref(useLocalStorage('token', '')); //useLocalSotrage() recibe 2 parametros ('key', 'valor por defecto)
  const authStatus = ref(AuthStatus.Checking);

  const login = async (email: string, password: string) => {
    try {
      const loginResp = await loginAction(email, password);
      if (!loginResp.ok) {
        logOut();
        return false;
      }

      authStatus.value = AuthStatus.Authenticated;
      token.value = loginResp.token;
      user.value = loginResp.user;

      return true;
    } catch (error) {
      console.log(error);
      return logOut();
    }
  };

  const logOut = () => {
    token.value = '';
    authStatus.value = AuthStatus.UnAuthenticated;
    user.value = undefined;
  };

  return {
    //VARIABLES
    user,
    token,
    authStatus,

    //GETTERS
    isChecking: computed(() => authStatus.value === AuthStatus.Checking),
    isAuthenticated: computed(() => authStatus.value === AuthStatus.Authenticated),

    //TODO: add a getter for know if the user is admin or not

    username: computed(() => user.value?.fullName),

    //METHODS - ACTIONS
    login,
  };
});
