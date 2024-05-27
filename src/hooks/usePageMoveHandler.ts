import { useNavigate } from 'react-router-dom';
import { PathValue } from '@/constants/paths';

/**
 * PATH 상수 키 값으로만 navigate 한다.
 */
export const usePageMoveHandler = () => {
  const navigate = useNavigate();

  return (path: PathValue) => {
    navigate(path);
  };
};
