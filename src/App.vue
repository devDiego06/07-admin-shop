<template>
  <FullScreenPagination v-if="authSotre.isChecking" />
  <RouterView v-else />
  <VueQueryDevtools />
</template>

<script lang="ts" setup>
import { VueQueryDevtools } from '@tanstack/vue-query-devtools';
import { useAuthStore } from './modules/auth/store/auth.store';
import { AuthStatus } from './modules/auth/interfaces/auth-status.enum';
import { useRoute, useRouter } from 'vue-router';
import FullScreenPagination from './modules/common/components/FullScreenPagination.vue';

const authSotre = useAuthStore();
const router = useRouter();
const route = useRoute();

//redirection to home screnn when be logued
authSotre.$subscribe(
  (_, state) => {
    if (state.authStatus === AuthStatus.Checking) {
      authSotre.checkAuthStatus();
      return;
    }

    if (route.path.includes('/auth') && state.authStatus === AuthStatus.Authenticated) {
      return router.replace({ name: 'home' });
    }
  },
  {
    immediate: true,
  },
);
</script>
