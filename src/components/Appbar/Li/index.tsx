import { ReactNode, MouseEvent } from 'react';
import { useLocation } from 'react-router-dom';

import { PATH } from '@/constants/paths';

type AppbarListPropsType = {
  children: ReactNode | ReactNode[];
  path?: ValueOf<typeof PATH>;
  onPageMove?: (event: MouseEvent<HTMLLIElement>) => void;
};

export const List = (props: AppbarListPropsType) => {
  const { children, path, onPageMove } = props;

  const { pathname } = useLocation();

  const rootPath = pathname.split('/')[1];
  const propPath = path?.split('/')[1];

  return (
    <li
      className={`py-4 px-6 cursor-pointer transition-all duration-100 ease hover:text-primary text-lg ${
        rootPath === propPath ? 'text-primary' : ''
      }`}
      onClick={onPageMove}
    >
      {children}
    </li>
  );
};
