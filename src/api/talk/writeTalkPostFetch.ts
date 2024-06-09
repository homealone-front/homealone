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
   * 혼잣말 컨텐츠 이미지 리스트
   */
  talkImages?: string[] | undefined;

  /**
   * 혼잣말 태그 리스트
   */
  tags?:
    | {
        tagName?: string | undefined;
      }[]
    | undefined;
}

export interface WriteTalkResponse extends ResponseModel {}

/**
 * Talk 작성 및 등록
 */
export const writeTalkPostFetch = (params: WriteTalkPostFetchParams) =>
  apiFetch.post<WriteTalkResponse>('/talk', params);
