import { kakaoFetch } from '../common';

export interface GetKakaoAccessTokenPostFetchParams {
  /**
   * authorization_code로 고정	O
   */
  grant_type: 'authorization_code';

  /**
   * env
   */
  client_id: string;

  /**
   * env
   */
  redirect_uri: string;

  /**
   * 쿼리스트링 code
   */
  code: string;
}

/**
 * 카카오에서 accessToken을 가져온다.
 */
export const getKakaoAccessTokenPostFetch = (params: GetKakaoAccessTokenPostFetchParams) =>
  kakaoFetch.post('https://kauth.kakao.com/oauth/token', params);
