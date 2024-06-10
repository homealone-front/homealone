import { apiFetch } from '../common';

export interface KakaoAuthUrlGetFetchParams {}

export type KakaoAuthUrlResponse = string;

/**
 * 카카오 oauth url 요청
 */
export const KakaoAuthUrlGetFetch = () => apiFetch.get<KakaoAuthUrlResponse>('/kakao');
