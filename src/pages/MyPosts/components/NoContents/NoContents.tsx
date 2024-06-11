import { getKoreanAffix } from './util';
/**
 * 작성된 글 없음 컴포넌트
 */

interface NoContentsPropsType {
  data: { id: string; name: string; imageUrl: string };
}

const NoContents = (data: NoContentsPropsType) => {
  const affix = getKoreanAffix(data.data.name);
  return (
    <div className="flex flex-col items-center gap-12 py-40">
      <img className="w-auto h-[8rem] opacity-35" src={data.data.imageUrl} alt="no-contents-icon" />
      <div className="text-2xl font-bold text-gray300">
        작성된 {data.data.name}
        {affix} 없습니다.
      </div>
    </div>
  );
};

export default NoContents;
