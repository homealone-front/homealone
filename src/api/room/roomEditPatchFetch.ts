import { apiFetch } from '../common';
import { ResponseModel } from '../model';
import { WriteRoomPostFetchParams, WriteRoomResponse } from './writeRoomPostFetch';

export interface RoomEditPatchFetchParams extends WriteRoomPostFetchParams {
  /**
   * 방자랑 게시물 ID
   */
  roomId: string;
}

export interface RoomEditResponse extends ResponseModel, WriteRoomResponse {}

/**
 * 방자랑 게시글 수정
 */
export const roomEditPatchFetch = (params: RoomEditPatchFetchParams) => {
  const { roomId, ...data } = params;
  return apiFetch.patch<RoomEditResponse>(`/room/${roomId}`, data);
};
