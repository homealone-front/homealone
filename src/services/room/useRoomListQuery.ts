import { useQuery } from '@tanstack/react-query';

import { roomListGetFetch, RoomListGetFetchParams } from '@/api/room/roomListGetFetch';

/**
 * 방자랑 전체 조회
 */
export const useRoomListQuery = (params: RoomListGetFetchParams) =>
  useQuery({
    queryKey: ['@roomList', params],
    queryFn: async () => {
      const response = await roomListGetFetch(params);

      const { data } = response;

      const { totalElements, totalPages, pageable, content } = data;

      return {
        totalElements,
        totalPages,
        pageable,
        content,
      };
    },
    select: (data) => ({
      ...data,
      totalPages: data.totalPages,
    }),
    staleTime: 5000,
  });
