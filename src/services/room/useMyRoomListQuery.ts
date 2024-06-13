import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { myRoomListGetFetch, MyRoomListGetFetchParams } from '@/api/room/myRoomListGetFetch';

/**
 * 내가 작성한 방자랑 조회
 */
export const useMyRoomListQuery = (params: MyRoomListGetFetchParams) =>
  useQuery({
    queryKey: ['@my-roomList', params],
    queryFn: async () => {
      const response = await myRoomListGetFetch(params);

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
