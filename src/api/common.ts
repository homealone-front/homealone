import axios from 'axios';

//TODO: .env baseURL 세팅 및 request, response interceptor 작성

export const baseURL = import.meta.env.VITE_APP_BASE_URL;

export const apiFetch = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

apiFetch.interceptors.request.use((config) => {
  //TODO: accessToken 전역상태 변수로 교체
  const accessToken = '';

  if (accessToken) {
    config.headers.set('AccessToken', accessToken);
  }

  return config;
});

apiFetch.interceptors.response.use((config) => {
  // http status 별로 에러케이스가 온다.
  return config;
});
