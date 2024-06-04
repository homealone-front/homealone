import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { MemberLoginResponse } from '@/api/member/memberLoginPostFetch';
import { MemberInfoResponse } from '@/api/member/memberInfoGetFetch';

export interface UserStoreState
  extends Partial<Omit<MemberLoginResponse, 'message'>>,
    Partial<Omit<MemberInfoResponse, 'message'>> {}

export interface UserStoreAction {
  setAccessToken: (accessToken: PropType<MemberLoginResponse, 'accessToken'>) => void;
  setUserInfo: (state: MemberInfoResponse) => void;
  removeUserInfo: () => void;
}

export const useUserStore = create<UserStoreState & UserStoreAction>()(
  persist(
    (set) => ({
      accessToken: '',

      setAccessToken: (accessToken) =>
        set({
          accessToken,
        }),

      setUserInfo: (state) =>
        set({
          ...state,
        }),

      removeUserInfo: () =>
        set(
          ({ setAccessToken, setUserInfo, removeUserInfo }) => ({
            setAccessToken,
            setUserInfo,
            removeUserInfo,
          }),
          true,
        ),
    }),
    {
      name: 'auth',
    },
  ),
);
