import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { MemberLoginResponse } from '@/api/member/memberLoginPostFetch';

export interface UserStoreState extends Partial<Omit<MemberLoginResponse, 'message'>> {}

export interface UserStoreAction {
  setAccessToken: (token: PropType<MemberLoginResponse, 'token'>) => void;
  removeUserInfo: () => void;
}

export const useUserStore = create<UserStoreState & UserStoreAction>()(
  persist(
    (set) => ({
      token: '',

      setAccessToken: (token) =>
        set({
          token,
        }),

      removeUserInfo: () =>
        set(
          ({ setAccessToken, removeUserInfo }) => ({
            setAccessToken,

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
