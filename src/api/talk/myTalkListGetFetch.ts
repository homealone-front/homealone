import { apiFetch } from '../common';
import { TalkListGetFetchParms, TalkListResponse } from './talkListGetFetch';

export interface MyTalkListGetFetchParms extends TalkListGetFetchParms {}
export interface MyTalkListResponse extends TalkListResponse {}

/**
 * 내가 작성한 혼잣말 게시글 조회 (페이지네이션)
 */
export const myTalkListGetFetch = (params: MyTalkListGetFetchParms) => {
  const { page = 0, size = 20 } = params;

  return apiFetch.get<MyTalkListResponse>(`/mypage/me/talk?page=${page}&size=${size}&sort=createdAt,desc`);
};
