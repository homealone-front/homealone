import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@/constants/paths';

/**
 * 404 NotFound 컴포넌트
 */
const NotFound = () => {
  const navigate = useNavigate();
  const goHome = () => navigate(PATH.root);

  return (
    <div className="flex flex-row px-[16%] py-auto items-center h-screen">
      <div className="w-full flex flex-row gap-60 justify-center">
        <div className="flex flex-col justify-center">
          <h1 className="text-7xl mb-6 text-primary">
            <span className="font-bold mr-4">404</span>
            <span className="font-thin ">ERROR</span>
          </h1>
          <p className="leading-8 mb-12 text-lg">
            죄송합니다. 페이지를 찾을 수 없습니다.
            <br />
            존재하지 않는 주소를 입력하셨거나
            <br />
            요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.
          </p>
          <div>
            <Button className="px-16 rounded-3xl text-lg" size="lg" onClick={goHome}>
              홈으로
            </Button>
          </div>
        </div>
        <img className="w-[26rem]" src="/icons/notFound.svg" alt="not-found" />
      </div>
    </div>
  );
};

export default NotFound;
