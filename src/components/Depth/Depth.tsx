import { ReactNode } from 'react';

type DepthPropsType = {
  children: ReactNode | ReactNode[];
  className?: string;
};

/**
 * 왼쪽 뎁스를 띈다.
 */
const Depth = (props: DepthPropsType) => {
  const { children, className } = props;

  return <div className={`ml-8 ${className}`}>{children}</div>;
};

export default Depth;
