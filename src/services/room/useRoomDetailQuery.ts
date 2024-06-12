import { useQuery } from '@tanstack/react-query';

import { roomDetailGetFetch, RoomDetailGetFetchParams } from '@/api/room/roomDetailGetFetch';

/**
 * 방자랑 상세 조회
 */
export const useRoomDetailQuery = ({ roomId }: RoomDetailGetFetchParams) =>
  useQuery({
    queryKey: ['@room-detail', roomId],
    queryFn: async () => {
      const response = await roomDetailGetFetch({ roomId });

      const { data } = response;

      return data;
    },
    select: (data) => ({
      ...data,
      imagesUrl: [data.thumbnailUrl, ...data.roomImages],
    }),
    staleTime: 5000,
  });
