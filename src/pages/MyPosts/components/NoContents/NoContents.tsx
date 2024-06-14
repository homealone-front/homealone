import { getKoreanAffix } from './util';
import { NavTabType } from '../../constants';

export interface NoContentsPropsType extends NavTabType {}

/**
 * 작성된 글 없음 컴포넌트
 */

const NoContents = (props: NoContentsPropsType) => {
  const { name, imageUrl } = props;

  const affix = getKoreanAffix(name);

  return (
    <div className="min-h-[32rem] flex flex-col gap-12 justify-center">
      <img className="w-auto h-[7.5rem] opacity-35" src={imageUrl} alt="no-contents-icon" />
      <div className="text-2xl font-bold text-gray300">
        작성된 {name}
        {affix} 없습니다.
      </div>
    </div>
  );
};

export default NoContents;
