import { MoveRight } from 'lucide-react';

type ListTitlePropsType = {
  title: string;
  imgPath: string;
  description: string;
};

/**
 * 메인 랜딩 섹션들의 타이틀
 */
const ListTitle = (props: ListTitlePropsType) => {
  const { title, imgPath, description } = props;

  return (
    <div className="flex justify-between items-center">
      <div className="mt-20 mb-8">
        <h2 className="flex gap-2 items-center">
          <img src={imgPath} alt={title} className="w-9 h-9" />
          <span className="text-2xl font-semibold">{title}</span>
        </h2>
        <p className=" mt-4 text-gray600 font-medium text-xl">{description}</p>
      </div>
      <div className="flex items-center cursor-pointer">
        <span className=" text-gray400">더보기</span>
        <MoveRight size={16} strokeWidth={0.5} className="ml-2" />
      </div>
    </div>
  );
};

export default ListTitle;
