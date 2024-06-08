import { apiFetch } from '../common';
import { ResponseModel } from '../model';

export interface WriteTalkPostFetchParams {
  /**
   * Talk 제목
   */
  title: string;

  /**
   * Talk 내용(text)
   */
  content: string;

  /**
   * Talk 이미지 배열
   */
  talkImages: string[];
}
[];

export interface WriteTalkResponse extends ResponseModel {}

/**
 * Talk 작성 및 등록
 */
export const writeTalkPostFetch = (params: WriteTalkPostFetchParams) =>
  apiFetch.post<WriteTalkResponse>('/talk', params);
