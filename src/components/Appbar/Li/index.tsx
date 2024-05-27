import { ReactNode, MouseEvent } from 'react';

type AppbarListPropsType = {
  children: ReactNode | ReactNode[];

  onPageMove?: (event: MouseEvent<HTMLLIElement>) => void;
};

export const List = (props: AppbarListPropsType) => {
  const { children, onPageMove } = props;

  return (
    <li className="py-4 px-6 cursor-pointer" onClick={onPageMove}>
      {children}
    </li>
  );
};
