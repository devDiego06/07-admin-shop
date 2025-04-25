import isAuthenticatedGuard from '@/modules/auth/guards/is-authenticated.guard';
import isAdminGuard from '@/modules/auth/guards/isAdmin.guard';
import type { RouteRecordRaw } from 'vue-router';

export const adminRoutes: RouteRecordRaw = {
  path: '/admin',
  name: 'admin',
  beforeEnter: [isAuthenticatedGuard, isAdminGuard],
  component: () => import('@/modules/admin/layouts/AdminLayouts.vue'),
};
