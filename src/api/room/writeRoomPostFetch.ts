import { apiFetch } from '../common';
import { ResponseModel } from '../model';

export interface WriteRoomPostFetchParams {
  /**
   * 방자랑 제목
   */
  title: string;

  /**
   * 방자랑 내용 컨텐츠
   */
  content: string;

  /**
   * 방자랑 썸네일 이미지
   */
  thumbnailUrl: string | string[];

  /**
   * 방자랑 컨텐츠 이미지 리스트
   */
  roomImages: string[];

  /**
   * 방자랑 태그 리스트
   */
  tags: {
    tagName: string;
  }[];
}

export interface WriteRoomResponse extends ResponseModel {}

/**
 * 방자랑 게시글 작성 및 등록
 */
export const writeRoomPostFetch = (params: WriteRoomPostFetchParams) =>
  apiFetch.post<WriteRoomResponse>('/room', params);
