import { apiFetch } from '../common';
import { ResponseModel } from '../model';

export interface RecipeDetailGetFetchParams {
  /**
   * 게시물 아이디
   */
  id: string;
}

export interface RecipeDetailResponse extends ResponseModel {
  /**
   * 게시물 식별값
   */
  id: number;

  /**
   * 레시피 이름
   */
  title: string;

  /**
   * 설명
   */
  description: string;

  /**
   * 인분
   */
  portions: number;

  /**
   * 레시피 타입
   */
  recipeType: string;

  /**
   * 요리시간
   */
  recipeTime: string;

  /**
   * 분야
   */
  cuisine: string;

  /**
   * 대표이미지
   */
  images: {
    imageUrl: string;
    fileName: string;
  }[];

  /**
   * 재료
   */
  ingredients: {
    name: string;
    quantity: string;
    unit: string;
  }[];

  /**
   * 조리순서
   */
  details: {
    description: string;
    fileName: string;
    imageUrl: string;
  }[];

  /**
   * 게시물 작성자 식별값
   */
  userId: number;

  /**
   * 게시물 작성자 닉네임
   */
  userName: string;

  postTags: {
    tagName: string;
  }[];

  /**
   * 좋아요 북마크 갯수
   */
  relatedDto: {
    /**
     * 조아요
     */
    likeCount: number;

    /**
     * 유저가 누름?
     */
    likeByCurrentUser: boolean;

    /**
     * 북마크
     */
    bookmarked: boolean;

    /**
     * 스크랩카운트?
     */
    scrapCount: string;
  };

  /**
   * 조회수
   */
  view: number;

  /**
   * 유저이미지
   */
  userImage: string | null;
}

/**
 * 레시피 상세조회
 */
export const recipeDetailGetFetch = ({ id }: RecipeDetailGetFetchParams) =>
  apiFetch.get<RecipeDetailResponse>(`/recipes/${id}`);
