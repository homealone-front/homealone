import { ReactNode, useEffect } from 'react';
import { BeatLoader } from 'react-spinners';

type CustomSpinnerType = {
  children?: ReactNode;
};

const CustomSpinner = (props: CustomSpinnerType) => {
  const { children } = props;

  useEffect(() => {
    const body = document.body;

    body.style.setProperty('overflow', 'hidden');

    return () => {
      body.style.removeProperty('overflow');
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 z-[111111] bg-black bg-opacity-40 w-screen h-screen flex flex-col justify-center items-center">
      <BeatLoader color="#319B72" loading aria-label="Loading Spinner" />
      <span className="block mt-4 text-xl text-primary font-semibold">{children}</span>
    </div>
  );
};

export default CustomSpinner;
