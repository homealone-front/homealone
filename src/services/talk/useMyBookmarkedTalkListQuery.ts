import { useQuery } from '@tanstack/react-query';
import {
  myBookmarkedTalkListGetFetch,
  MyBookmarkedTalkListGetFetchParms,
} from '@/api/talk/myBookmarkedTalkListGetFetch';

/**
 * 내가 저장한 혼잣말 조회
 */

export const useMyBookmarkedTalkListQuery = (params: MyBookmarkedTalkListGetFetchParms) =>
  useQuery({
    queryKey: ['@my-bookmarked-talkList', params],
    queryFn: async () => {
      const response = await myBookmarkedTalkListGetFetch(params);

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
