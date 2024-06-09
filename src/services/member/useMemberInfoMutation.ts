import { useMutation } from '@tanstack/react-query';
import { useUserStore } from '@/store/useUserStore';

import { MemberInfoPatchFetchParams, memberInfoPatchFetch } from '@/api/member/memberInfoPatchFetch';
import { memberInfoGetFetch } from '@/api/member/memberInfoGetFetch';

/**
 * 회원 정보 수정
 */
export const useMemberInfoMutation = () => {
  const setUserInfo = useUserStore((state) => state.setUserInfo);

  const mutation = useMutation({
    mutationFn: (params: MemberInfoPatchFetchParams) => memberInfoPatchFetch(params),
    onSuccess: async () => {
      const response = await memberInfoGetFetch();
      setUserInfo(response.data);
    },
    onError: (error) => {
      console.error('회원 정보 수정에 실패했습니다.', error);
    },
  });
  return mutation;
};
