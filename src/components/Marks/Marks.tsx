import { memo } from 'react';
import { HeartIcon, BookmarkIcon } from './Icons';
import { likePostFetch } from '@/api/marks/likePostFetch';
import { TalkDetailResponse } from '@/api/talk/talkDetailGetFetch';
import { RecipeDetailResponse } from '@/api/reciepe/recipeDetailGetFetch';
import { scrapPostFetch } from '@/api/marks/scrapPostFetch';
import { useUserStore } from '@/store/useUserStore';
import { toast } from '../ui/use-toast';
import { CircleCheck } from 'lucide-react';
import { TOAST } from '@/constants/toast';

export type MarksPropsType = {
  // TODO: RoomDetailResponse 추가
  postId: number;
  data: RecipeDetailResponse | TalkDetailResponse | undefined;
  refetch: () => void;
};

const Marks = ({ postId, data, refetch }: MarksPropsType) => {
  const accessToken = useUserStore((state) => state.accessToken);

  const showToast = (title: string) => {
    toast({
      title: title,
      icon: <CircleCheck />,
      className: TOAST.success,
    });
  };

  const handleLikesBtn = async () => {
    if (accessToken) {
      try {
        await likePostFetch({ postId: postId });
        refetch();
        if (data) {
          const title =
            'like' in data
              ? data.like
                ? '좋아요 취소'
                : '이 게시물을 좋아해요.'
              : data.relatedDto.likeByCurrentUser
              ? '좋아요 취소'
              : '이 게시물을 좋아합니다.';
          showToast(title);
        }
      } catch (error) {
        alert('좋아요 실패');
      }
    } else {
      alert('로그인이 필요해요.');
    }
  };

  const handleScrapBtn = async () => {
    if (accessToken) {
      try {
        await scrapPostFetch({ postId: postId });
        refetch();
        if (data) {
          const title =
            'like' in data
              ? data.scrap
                ? '북마크 취소'
                : '북마크가 완료되었어요.'
              : data.relatedDto.bookmarked
              ? '북마크 취소'
              : '북마크가 완료되었어요.';
          showToast(title);
        }
      } catch (error) {
        alert('북마크 실패');
      }
    } else {
      alert('로그인이 필요해요.');
    }
  };

  return (
    <>
      {data ? (
        <div className="w-11 h-28 border border-solid bg-white border-slate-300 rounded-xl flex flex-col justify-evenly items-center fixed z-10 ml-3">
          <>
            <div className="w-4/5 h-2/5 flex flex-col justify-center items-center">
              <button
                onClick={handleLikesBtn}
                className="w-full rounded-full flex justify-center items-center active:animate-button-jump"
              >
                <HeartIcon filled={'like' in data ? data.like : data.relatedDto.likeByCurrentUser} />
              </button>
              <span className="text-xs text-slate-500 mt-0.5">
                {'like' in data ? data.likeCount : data.relatedDto.likeCount}
              </span>
            </div>
            <div className="w-4/5 h-2/5 flex flex-col justify-center items-center">
              <button
                onClick={handleScrapBtn}
                className="w-full rounded-full flex justify-center items-center active:animate-button-jump"
              >
                <BookmarkIcon filled={'like' in data ? data.scrap : data.relatedDto.bookmarked} />
              </button>
              <span className="text-xs text-slate-500 mt-0.5">
                {'like' in data ? data.scrapCount : data.relatedDto.scrapCount}
              </span>
            </div>
          </>
        </div>
      ) : null}
    </>
  );
};

export default memo(Marks);
