import { apiFetch } from '../common';
import { TalkListGetFetchParms, TalkListResponse } from './talkListGetFetch';

export interface MyBookmarkedTalkListGetFetchParms extends TalkListGetFetchParms {}
export interface MyBookmarkedTalkListResponse extends TalkListResponse {}

/**
 * 내가 저장한 혼잣말 게시글 조회 (페이지네이션)
 */
export const myBookmarkedTalkListGetFetch = (params: MyBookmarkedTalkListGetFetchParms) => {
  const { page = 0, size = 20 } = params;

  return apiFetch.get<MyBookmarkedTalkListResponse>(
    `/mypage/me/scraps/talk?page=${page}&size=${size}&sort=createdAt,desc`,
  );
};
