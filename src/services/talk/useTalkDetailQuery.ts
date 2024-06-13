import { TalkDetailGetFetchParams, talkDetailGetFetch } from '@/api/talk/talkDetailGetFetch';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

/**
 * 혼잣말 상세 조회
 */
export const useTalkDetailQuery = ({ id }: TalkDetailGetFetchParams) =>
  useQuery({
    queryKey: ['@talk-detail', id],
    queryFn: async () => {
      const response = await talkDetailGetFetch({ id });

      const { data } = response;

      return data;
    },
    placeholderData: keepPreviousData,
    staleTime: 5000,
  });
