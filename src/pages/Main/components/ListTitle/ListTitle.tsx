import { MouseEventHandler } from 'react';
import { MoveRight } from 'lucide-react';

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
    <div className="flex justify-between items-center">
      <div className="mt-20 mb-8">
        <h2 className="flex gap-2 items-center">
          <img src={imgPath} alt={title} className="w-9 h-9" />
          <span className="text-2xl font-semibold">{title}</span>
        </h2>
        {description ? <p className=" mt-4 text-gray600 font-medium text-xl">{description}</p> : null}
      </div>
      {onPageMove ? (
        <div className="flex items-center cursor-pointer  self-end pb-8" onClick={onPageMove}>
          <span className=" text-gray400">더보기</span>
          <MoveRight size={16} strokeWidth={0.5} className="ml-2" />
        </div>
      ) : null}
    </div>
  );
};

export default ListTitle;
