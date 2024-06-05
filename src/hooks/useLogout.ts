import { useNavigate } from 'react-router-dom';
import { useUserStore } from '@/store/useUserStore';
import { PATH } from '@/constants/paths';

export const useLogout = () => {
  const navigate = useNavigate();

  const removeUserInfo = useUserStore((state) => state.removeUserInfo);

  const logout = () => {
    removeUserInfo();

    navigate(PATH.root);
  };

  return logout;
};
