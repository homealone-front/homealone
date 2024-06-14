import { apiFetch } from '../common';
import { RoomListGetFetchParams, RoomListResponse } from './roomListGetFetch';

export interface MyBookmarkedRoomListGetFetchParams extends RoomListGetFetchParams {}
export interface MyBookmarkedRoomListResponse extends RoomListResponse {}

/**
 * 내가 저장한 방자랑 게시글 조회 (페이지네이션)
 */
export const myBookmarkedRoomListGetFetch = (params: MyBookmarkedRoomListGetFetchParams) => {
  const { page = 0, size = 20 } = params;

  return apiFetch.get<MyBookmarkedRoomListResponse>(
    `/mypage/me/scraps/room?page=${page}&size=${size}&sort=createdAt,desc`,
  );
};
