import axios from 'axios';
import { useUserStore } from '@/store/useUserStore';

export const baseURL = import.meta.env.VITE_APP_BASE_URL;

export const apiFetch = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

apiFetch.interceptors.request.use((config) => {
  const { accessToken } = useUserStore.getState();

  if (accessToken) {
    config.headers.set('Authorization', accessToken);
  }

  return config;
});

apiFetch.interceptors.response.use((config) => {
  // http status 별로 에러케이스가 온다.
  return config;
});
