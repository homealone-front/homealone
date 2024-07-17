import { ReactNode } from 'react';

type LayoutPropsType = {
  children: ReactNode | ReactNode[];
};

const Layout = (props: LayoutPropsType) => {
  const { children } = props;

  return (
    <div className="wrapper w-full h-full ">
      <div className="container">{children}</div>
    </div>
  );
};

export default Layout;
