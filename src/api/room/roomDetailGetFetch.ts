import { apiFetch } from '../common';
import { ResponseModel } from '../model';
import { WriteRoomPostFetchParams } from './writeRoomPostFetch';

export interface RoomDetailGetFetchParams {
  /**
   * 방자랑 게시물 ID
   */
  roomId: string;
}

export interface RoomDetailResponse extends ResponseModel, WriteRoomPostFetchParams {
  /**
   * 작성자 이름
   */
  memberName: string;

  /**
   * 댓글 수
   */
  commentCount: number;

  /**
   * 작성 날짜
   */
  createdAt: string;

  /**
   * 조회 수
   */
  view: number;

  /**
   * 좋아요 수
   */
  likeCount: number;

  /**
   * 북마크 수
   */
  scrapCount: number;

  /**
   * 현재 유저의 좋아요 여부
   */
  like: boolean;

  /**
   * 현재 유저의 북마크 여부
   */
  scrap: boolean;
}

/**
 * 방자랑 상세 조회
 */
export const roomDetailGetFetch = (params: RoomDetailGetFetchParams) => {
  const { roomId } = params;

  return apiFetch.get<RoomDetailResponse>(`/room/${roomId}`);
};
