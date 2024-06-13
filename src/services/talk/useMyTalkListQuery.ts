import { useQuery } from '@tanstack/react-query';
import { myTalkListGetFetch, MyTalkListGetFetchParms } from '@/api/talk/myTalkListGetFetch';

/**
 * 내가 작성한 혼잣말 조회
 */

export const useMyTalkListQuery = (params: MyTalkListGetFetchParms) =>
  useQuery({
    queryKey: ['@my-talkList', params],
    queryFn: async () => {
      const response = await myTalkListGetFetch(params);

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
