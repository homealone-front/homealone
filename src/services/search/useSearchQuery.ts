import { useQuery } from '@tanstack/react-query';
import { searchTalkGetFetch, TalkListGetFetchParms } from '@/api/talk/talkListGetFetch';
import { RoomListGetFetchParams, searchRoomGetFetch } from '@/api/room/roomListGetFetch';

// TODO: 레시피, 방자랑 추가하기
type FetchParams = TalkListGetFetchParms;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FetchFn<T extends FetchParams> = (params: T) => Promise<any>;

interface UseSearchQueryOptions<T extends FetchParams> {
  params: T;
  fetchFn: FetchFn<T>;
  queryKeyPrefix: string;
}

/**
 * 공통 검색 쿼리 훅
 */
export const useSearchQuery = <T extends FetchParams>({ params, fetchFn, queryKeyPrefix }: UseSearchQueryOptions<T>) =>
  useQuery({
    queryKey: [`${queryKeyPrefix}`, params],
    queryFn: async () => {
      const response = await fetchFn(params);

      const { data } = response;

      const { totalElements, totalPages, pageable, content } = data;

      return {
        totalElements,
        totalPages,
        pageable,
        content,
      };
    },
    staleTime: 5000,
  });

/**
 * 방자랑 검색 결과 조회
 */
export const useSearchRoomQuery = (params: RoomListGetFetchParams) =>
  useSearchQuery({
    params,
    fetchFn: searchRoomGetFetch,
    queryKeyPrefix: '@search-roomList',
  });

/**
 * 혼잣말 검색 결과 조회
 */
export const useSearchTalkQuery = (params: TalkListGetFetchParms) =>
  useSearchQuery({
    params,
    fetchFn: searchTalkGetFetch,
    queryKeyPrefix: '@search-talkList',
  });
