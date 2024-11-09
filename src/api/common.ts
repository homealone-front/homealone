import axios from 'axios';
import { useUserStore } from '@/store/useUserStore';
import { PATH } from '@/constants/paths';
// import { redirectDocument } from 'react-router-dom';
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

apiFetch.interceptors.response.use(async (res) => {
  const { status, error } = res.data;
  const originalRequest = res.config;

  if (!isExitApplication && status === 401) {
    const logout = () => {
      useUserStore.persist.clearStorage();
      isExitApplication = true;

      location.href = PATH.root;
    };

    if (error === 'EXPIRED_ACCESS_TOKEN') {
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
    if (error === 'EXPIRED_REFRESH_TOKEN') {
      logout();
    }
    return Promise.reject(originalRequest);
  }

  return res;
});
