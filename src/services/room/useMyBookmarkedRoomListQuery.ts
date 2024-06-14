import { keepPreviousData, useQuery } from '@tanstack/react-query';

import {
  myBookmarkedRoomListGetFetch,
  MyBookmarkedRoomListGetFetchParams,
} from '@/api/room/myBookmarkedRoomListGetFetch';

/**
 * 내가 저장한 방자랑 조회
 */
export const useMyBookmarkedRoomListQuery = (params: MyBookmarkedRoomListGetFetchParams) =>
  useQuery({
    queryKey: ['@my-bookmarked-roomList', params],
    queryFn: async () => {
      const response = await myBookmarkedRoomListGetFetch(params);

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
    placeholderData: keepPreviousData,
  });
