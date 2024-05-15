import axios from 'axios';

//TODO: .env baseURL 세팅 및 request, response interceptor 작성

export const baseURL = import.meta.env.VITE_APP_BASE_URL;

export const apiFetch = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 600000,
  withCredentials: true,
});
