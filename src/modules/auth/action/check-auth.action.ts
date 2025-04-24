import { tesloApi } from '@/api/tesloAip';
import type { User } from '../interfaces';
import { isAxiosError } from 'axios';

interface CheckError {
  ok: false;
}

interface CheckSuccess {
  ok: true;
  user: User;
  token: string;
}

export const checkAuthAction = async (): Promise<CheckError | CheckSuccess> => {
  try {
    const token = localStorage.getItem('token');
    if (!token || token.length <= 10) {
      return { ok: false };
    }

    const { data } = await tesloApi.get('/auth/check-status');

    return {
      ok: true,
      user: data.user,
      token: data.token,
    };
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 401) {
      return {
        ok: false,
      };
    }
    throw new Error('No se pudo verificar la sesion');
  }
};
