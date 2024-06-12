import { addCommentPostFetch } from '@/api/comment/addCommentPostFetch';
import { Appbar } from '@/components/Appbar';
import { Layout } from '@/layout';
import { useTalkDetailQuery } from '@/services/talk/useTalkDetailQuery';
import { useLocation } from 'react-router-dom';
// import { Comment } from '@/components/Comment';
// import { CommentForm } from '@/components/CommentForm';

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Marks } from '@/components/Marks';
import { useCommentListQuery } from '@/services/comment/useCommentListQuery';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { commentSchema } from '../ReciepeDetail/validator';
import { SkeletonComment } from '@/components/SkeletonComment';
import { useUserStore } from '@/store/useUserStore';
import { Comment } from '@/components/Comment';
import { CommentForm } from '@/components/CommentForm';
import { Spinner } from '@/components/Spinner';
import dayjs from 'dayjs';
import { likePostFetch } from '@/api/marks/likePostFetch';
import { useCallback } from 'react';

/**
 * 혼잣말 게시글 상세페이지
 */
const TalkDetail = () => {
  const { pathname } = useLocation();

  const id = pathname.split('/')[2];
  const userId = useUserStore((state) => state.id);
  const imageUrl = useUserStore((state) => state.imageUrl);

  const { data, refetch: detailRefetch, isFetching: detailFetching } = useTalkDetailQuery({ id });

  const {
    data: commentData,
    refetch: commentRefetch,
    isFetching: commentFetching,
  } = useCommentListQuery({ postId: id });

  const method = useForm({
    resolver: yupResolver(commentSchema),
    values: {
      content: '',
    },
  });

  const {
    handleSubmit: submit,
    control,
    getValues,
    watch,
    setValue,
    formState: { errors },
  } = method;

  const handleSubmit = submit(async () => {
    try {
      const content = getValues('content').trim();

      const addParams = {
        content,
        postId: parseInt(id, 10),
      };

      await addCommentPostFetch(addParams);

      setValue('content', '');

      await commentRefetch();
    } catch (error) {
      console.error(error);
    }
  });

  const handleLikesBtn = useCallback(async () => {
    try {
      if (data) {
        await likePostFetch({ postId: Number(id) });
        await detailRefetch(); // 데이터 다시 불러오기
      }
    } catch (error) {
      alert('좋아요 실패');
    }
  }, []);

  return (
    <>
      <Appbar />
      <Layout>
        {!detailFetching ? (
          <>
            <Marks
              onLikeSubmit={handleLikesBtn}
              onBookmarkSubmit={handleLikesBtn}
              likeCount={data?.likeCount}
              scrapCount={data?.scrapCount}
              isLike={data?.like}
              isBookmark={data?.scrap}
            />
            <div className="w-3/4 mx-auto pb-24">
              <div className="flex gap-2 items-center text-lg">
                <Avatar>
                  <AvatarImage src={imageUrl} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span className="text-sm font-light">{data?.memberName}</span>
              </div>
              <div>
                <span className="text-gray500 text-sm font-light">
                  {dayjs(data?.createdAt).format('YYYY년 MM월 DD일')}
                </span>
              </div>

              <div className="mt-8 flex gap-2 flex-col justify-center">
                <h3 className="text-2xl font-semibold">{data?.title}</h3>
                <p className="text-lg font-light">{data?.content}</p>
              </div>
            </div>
            <CommentForm
              name="content"
              control={control}
              imageUrl={imageUrl}
              error={errors?.content}
              onSubmit={handleSubmit}
              value={watch('content')}
            />
            {commentFetching ? (
              <div className="flex flex-col justify-center gap-2">
                {Array.from({ length: 8 }).map((_, i) => (
                  <SkeletonComment key={i} />
                ))}
              </div>
            ) : commentData && commentData.length > 0 ? (
              commentData?.map((item) => (
                <Comment key={item.id} write={userId === item?.memberId} commentRefetch={commentRefetch} {...item} />
              ))
            ) : (
              <div className="min-h-40 flex items-center justify-around p-4 border border-gray-300 shadow-md rounded-xl">
                <div>
                  <p className="leading-8  text-lg text-primary font-semibold">
                    아직 댓글이 없는 게시글이에요. <br />첫 댓글의 주인공이 되어보세요!
                  </p>
                </div>
                <img className="w-32 h-32" src="/icons/notFound.svg" alt="" />
              </div>
            )}
          </>
        ) : (
          <Spinner>혼잣말을 불러오고 있어요 …</Spinner>
        )}
      </Layout>
    </>
  );
};

export default TalkDetail;
