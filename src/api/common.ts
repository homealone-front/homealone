import axios from 'axios';
import { useUserStore } from '@/store/useUserStore';
import { PATH } from '@/constants/paths';
import { refreshGetFetch } from './member/refreshPostFetch';

export const baseURL = import.meta.env.VITE_APP_BASE_URL;

export const apiFetch = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

let isExitApplication = false;

apiFetch.interceptors.request.use((config) => {
  if (isExitApplication) {
    throw new axios.Cancel('Application Exit!');
  }

  const { accessToken } = useUserStore.getState();

  if (accessToken) {
    config.headers.set('Authorization', accessToken);
  }

  return config;
});

apiFetch.interceptors.response.use(
  (res) => res,
  async (error) => {
    const { config, response } = error;

    const originalRequest = config;
    const { status, message } = response.data;

    const logout = () => {
      useUserStore.persist.clearStorage();
      isExitApplication = true;

      location.href = PATH.root;
    };

    if (!isExitApplication && status === 401) {
      if (message === 'EXPIRED_ACCESS_TOKEN') {
        const { data } = await refreshGetFetch();

        if (data.accessToken) {
          useUserStore.setState({ accessToken: data.accessToken });

          originalRequest.headers['Authorization'] = data.accessToken;

          return apiFetch(originalRequest);
        } else {
          alert('토큰 갱신에 실패했습니다. 다시 로그인해주세요!');

          logout();
        }
      }
      if (message === 'EXPIRED_REFRESH_TOKEN') {
        alert('세션이 만료되었습니다. 다시 로그인해주세요!');

        logout();
      }
      return Promise.reject(error);
    }
  },
);
