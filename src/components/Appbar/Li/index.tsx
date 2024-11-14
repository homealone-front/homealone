import { ReactNode, MouseEvent } from 'react';
import { useLocation } from 'react-router-dom';

import { PATH } from '@/constants/paths';
import { cn } from '@/lib/utils';

type AppbarListPropsType = {
  children: ReactNode | ReactNode[];
  path?: ValueOf<typeof PATH>;
  onPageMove?: (event: MouseEvent<HTMLLIElement>) => void;
  className?: string;
};

export const List = (props: AppbarListPropsType) => {
  const { children, path, onPageMove, className } = props;

  const { pathname } = useLocation();

  const rootPath = pathname.split('/')[1];
  const propPath = path?.split('/')[1];

  return (
    <li
      className={cn(
        `py-4 px-6 cursor-pointer transition-all duration-100 ease hover:text-primary text-lg ${
          rootPath === propPath ? 'text-primary' : ''
        }`,
        className,
      )}
      onClick={onPageMove}
    >
      {children}
    </li>
  );
};
