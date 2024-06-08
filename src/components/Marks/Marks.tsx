import { Bookmark, Heart } from 'lucide-react';

export type MarksPropsType = {
  onLikesSubmit: () => void;
  onBookmarkSubmit: () => void;
  likes: number;
  isLike: boolean;
  isBookmark: boolean;
};

const Marks = (props: MarksPropsType) => {
  const { likes, isLike, isBookmark, onLikesSubmit, onBookmarkSubmit } = props;

  return (
    <div className="w-11 h-28 border border-solid bg-white border-slate-300 rounded-xl flex flex-col justify-evenly items-center fixed z-10 ml-3">
      <div className="w-4/5 h-2/5 flex flex-col justify-center items-center">
        <button onClick={onLikesSubmit} className="w-full rounded-full flex justify-center items-center">
          <Heart fill={isLike ? '#bb3433' : ''} color={isLike ? '#bb3433' : '#dedede'} strokeWidth={1} />
        </button>
        <span className="text-xs text-slate-500">{likes}</span>
      </div>
      <div className="w-4/5 h-2/5 flex justify-center items-center">
        <button onClick={onBookmarkSubmit} className="w-full rounded-full flex justify-center items-center">
          <Bookmark fill={isBookmark ? '#F2D03C' : ''} color={isBookmark ? '#F2D03C' : '#dedede'} strokeWidth={1} />
        </button>
      </div>
    </div>
  );
};

export default Marks;
