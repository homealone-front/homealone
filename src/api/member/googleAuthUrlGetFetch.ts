import { apiFetch } from '../common';

export interface GoogleAuthUrlGetFetchParams {}

export type GoogleAuthUrlResponse = string;

/**
 * 구글 oauth url 요청
 */
export const googleAuthUrlGetFetch = () => apiFetch.get<GoogleAuthUrlResponse>('/google');
