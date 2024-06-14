import { getKoreanAffix } from '@/pages/MyPosts/components/NoContents/util';
import { NavTabType } from '../../constants';

export interface NoContentsPropsType extends NavTabType {}

/**
 * 저장한 글 없음 컴포넌트
 */

const NoBookmark = (props: NoContentsPropsType) => {
  const { name, imageUrl } = props;

  const affix = getKoreanAffix(name);

  return (
    <div className="min-h-[32rem] flex flex-col gap-12 justify-center">
      <img className="w-auto h-[7.5rem] opacity-35" src={imageUrl} alt="no-contents-icon" />
      <div className="text-2xl font-bold text-gray300">
        저장한 {name}
        {affix} 없습니다.
      </div>
    </div>
  );
};

export default NoBookmark;
