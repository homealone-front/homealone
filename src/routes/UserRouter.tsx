import { Outlet } from 'react-router-dom';

import { usePageMoveHandler } from '@/hooks/usePageMoveHandler';

import { Alert } from '@/components/Alert';

import { PATH } from '@/constants/paths';

/**
 * token없을 시, 권한이 있어야하는 페이지 접근을 막는다.
 */
const UserRouter = () => {
  const navigate = usePageMoveHandler();

  const accessToken = JSON.parse(localStorage.getItem('auth') as string)?.state?.token;

  return !accessToken ? (
    <Alert
      title="권한이 없어요"
      content="로그인이 필요한 서비스 입니다!"
      isOpen={!accessToken}
      submitButtonText="확인"
      onSubmit={() => navigate(PATH.login)}
    />
  ) : (
    <Outlet />
  );
};

export default UserRouter;
