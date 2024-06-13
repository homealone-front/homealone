import { apiFetch } from '../common';
import { RoomListGetFetchParams, RoomListResponse } from './roomListGetFetch';

export interface MyRoomListGetFetchParams extends RoomListGetFetchParams {}
export interface MyRoomListResponse extends RoomListResponse {}

/**
 * 내가 작성한 방자랑 게시글 조회 (페이지네이션)
 */
export const myRoomListGetFetch = (params: MyRoomListGetFetchParams) => {
  const { page = 0, size = 20 } = params;

  return apiFetch.get<MyRoomListResponse>(`/mypage/me/room?page=${page}&size=${size}&sort=createdAt,desc`);
};
