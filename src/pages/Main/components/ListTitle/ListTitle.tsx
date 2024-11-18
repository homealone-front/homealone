import { MouseEventHandler } from 'react';
import { ChevronRight, MoveRight } from 'lucide-react';

type ListTitlePropsType = {
  title: string;
  imgPath: string;
  description?: string;

  onPageMove?: MouseEventHandler;
};

/**
 * 메인 랜딩 섹션들의 타이틀
 */
const ListTitle = (props: ListTitlePropsType) => {
  const { title, imgPath, description, onPageMove } = props;

  return (
    <div className="flex flex-col justify-between mt-20 mb-8">
      <h2 className="flex gap-2 items-center">
        <img src={imgPath} alt={title} width={36} height={36} className="w-9 h-9" />
        <span className="text-2xl font-semibold whitespace-nowrap">{title}</span>
      </h2>
      <div className="flex justify-between items-center mt-4">
        {description ? <p className=" text-gray600 font-medium text-md sm:text-lg md:text-xl">{description}</p> : null}
        {onPageMove ? (
          <div className="flex items-center cursor-pointer hover:opacity-50" onClick={onPageMove}>
            <div className="hidden md:flex md:items-center">
              <span className=" text-gray400">더보기</span>
              <MoveRight size={16} strokeWidth={0.5} className="ml-2" />
            </div>
            <div className="md:hidden mb-1  ">
              <ChevronRight size={32} strokeWidth={1.6} />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ListTitle;
