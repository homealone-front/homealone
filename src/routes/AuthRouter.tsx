import { Outlet } from 'react-router-dom';

import { usePageMoveHandler } from '@/hooks/usePageMoveHandler';

import { useUserStore } from '@/store/useUserStore';

import { Alert } from '@/components/Alert';

import { PATH } from '@/constants/paths';

/**
 * 이미 로그인 된 사용자의 접근을 막는다.
 * - login
 * - register
 * - find
 */
const AuthRouter = () => {
  const navigate = usePageMoveHandler();

  const accessToken = useUserStore((state) => state.token);

  return !accessToken ? (
    <Outlet />
  ) : (
    <Alert
      title="비정상적인 접근"
      content="이미 로그인 되어있습니다."
      isOpen={accessToken !== ''}
      submitButtonText="확인"
      onSubmit={() => navigate(PATH.root)}
    />
  );
};

export default AuthRouter;
