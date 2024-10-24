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

export const kakaoFetch = axios.create({
  headers: {
    'Content-type': ' application/x-www-form-urlencoded;charset=utf-8',
  },
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

let isRefreshing = false;

apiFetch.interceptors.response.use(async (res) => {
  if (!isExitApplication && res.data.status === 401 && res.data.error === 'UNAUTHORIZED') {
    const originalRequest = res.config;

    if (!isRefreshing) {
      isRefreshing = true;
      const { data } = await refreshGetFetch();

      if (data.accessToken) {
        // 기존 요청에 새로운 토큰 설정
        useUserStore.setState({ accessToken: data.accessToken });
        originalRequest.headers['Authorization'] = data.accessToken;

        isRefreshing = false;
        return apiFetch(originalRequest);
      } else {
        alert(
          '다른 기기에서 동일한 아이디로 로그인되어 자동로그아웃 되었습니다. 서비스를 계속 이용하시려면 다시 로그인 하시기 바랍니다!',
        );

        useUserStore.persist.clearStorage();
        isExitApplication = true;

        location.href = PATH.root;
      }
    }

    return Promise.reject(originalRequest);
  }

  return res;
});
