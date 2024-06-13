import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { talkListGetFetch, TalkListGetFetchParms } from '@/api/talk/talkListGetFetch';

/**
 * 혼잣말 전체 조회
 */

export const useTalkListQuery = (params: TalkListGetFetchParms) =>
  useQuery({
    queryKey: ['@talkList', params],
    queryFn: async () => {
      const response = await talkListGetFetch(params);

      const { data } = response;

      console.info(data);

      const { totalElements, totalPages, pageable, content } = data;

      return {
        totalElements,
        totalPages,
        pageable,
        content,
      };
    },
    placeholderData: keepPreviousData,
    staleTime: 5000,
  });
