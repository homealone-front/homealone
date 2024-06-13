import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { Badge } from '@/components/ui/badge';

import { Appbar } from '@/components/Appbar';
import { Layout } from '@/layout';
import { Comment } from '@/components/Comment';
import { CommentForm } from '@/components/CommentForm';
import { Marks } from '@/components/Marks';

import { useUserStore } from '@/store/useUserStore';

import { useRecipeDetailQuery } from '@/services/recipe/useRecipeDetailQuery';
import { useCommentListQuery } from '@/services/comment/useCommentListQuery';

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

// import { COOK_TIME } from '../ReciepeWrite/constants';
import { useToast } from '@/hooks/useToast';
import { yupResolver } from '@hookform/resolvers/yup';
import { commentSchema } from './validator';
import { addCommentPostFetch } from '@/api/comment/addCommentPostFetch';
import { Card } from '@/components/Card';
import { ListTitle } from '../Main/components/ListTitle';
import { Spinner } from '@/components/Spinner';
import { SkeletonComment } from '@/components/SkeletonComment';
import { useModalStore } from '@/store/useModalStore';
import { Confirm } from '@/components/Confirm';
import { isAxiosError } from 'axios';
import { CircleCheckIcon, CircleXIcon } from 'lucide-react';
import { TOAST } from '@/constants/toast';
import { removeRecipeDeleteFetch } from '@/api/recipe/removeRecipeDeleteFetch';
import { PATH } from '@/constants/paths';

/**
 * 레시피 게시글 상세페이지
 */
const RecipeDetail = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const id = pathname.split('/')[2];

  const userId = useUserStore((state) => state.id);
  const imageUrl = useUserStore((state) => state.imageUrl);

  const setModal = useModalStore((state) => state.setModal);
  const onOpen = useModalStore((state) => state.onOpen);
  const onClose = useModalStore((state) => state.onClose);

  const { data, refetch: detailRefetch, isFetching: detailFetching } = useRecipeDetailQuery({ id });

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

  const handleRemoveRecipe = async () => {
    try {
      await removeRecipeDeleteFetch({ id });

      onClose();

      toast({
        title: '레시피를 삭제했어요.',
        icon: <CircleCheckIcon />,
        className: TOAST.success,
      });

      navigate(PATH.recipe);
    } catch (error) {
      console.error(error);

      if (isAxiosError(error)) {
        toast({
          title: '레시피를 삭제하지 못했어요.',
          icon: <CircleXIcon />,
          className: TOAST.error,
        });

        return;
      }
    }
  };

  const detailUserId = data?.userId;

  return (
    <>
      <Appbar />

      <Layout>
        {!detailFetching ? (
          <>
            <Marks postId={parseInt(id, 10)} data={data} refetch={detailRefetch} />
            <div className="w-3/4 pb-24 mx-auto">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-lg">
                  <Avatar>
                    <AvatarImage
                      src={
                        'https://firebasestorage.googleapis.com/v0/b/homealone-adce9.appspot.com/o/images%2F2024-06-08_3cbdb5af-525e-4420-b291-4fc200e3038b.png?alt=media&token=9a750c95-5b35-4ead-9798-1d90a0727941'
                      }
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  By <span className="text-sm font-light">{data?.userName}</span>
                </div>

                {userId === detailUserId ? (
                  <ul className="flex gap-2 ml-auto text-xs text-gray400">
                    <li
                      className="cursor-pointer"
                      onClick={() => {
                        setModal(
                          <Confirm
                            title="게시글 수정"
                            content="레시피 수정페이지로 이동하시겠어요?"
                            submitButtonText="이동"
                            onClose={onClose}
                            onSubmit={() => {
                              onClose();
                              navigate(`${PATH.recipe}/${id}/edit`);
                            }}
                          />,
                        );

                        onOpen();
                      }}
                    >
                      수정
                    </li>
                    <li
                      className="cursor-pointer"
                      onClick={() => {
                        setModal(
                          <Confirm
                            title="게시글 삭제"
                            content="정말 삭제하시겠어요?"
                            submitButtonText="삭제"
                            onClose={onClose}
                            onSubmit={handleRemoveRecipe}
                          />,
                        );

                        onOpen();
                      }}
                    >
                      삭제
                    </li>
                  </ul>
                ) : null}
              </div>

              <div className="flex flex-col justify-center gap-2 mt-8">
                <h3 className="text-2xl font-semibold">{data?.title}</h3>
                <p className="text-lg font-light">{data?.description}</p>
              </div>

              <img className="mt-6 rounded-lg" src={data?.images[0].imageUrl} alt="" />
              {data && data?.postTags.length > 0 ? (
                <div className="mt-2">
                  {data?.postTags.map((item, i) => (
                    <Badge key={i} className="ml-1 bg-gray300 text-gray700 hover:bg-gray300">
                      {item.tagName}
                    </Badge>
                  ))}
                </div>
              ) : null}

              <ListTitle title="재료" imgPath="/icons/receipe_icon.png" />
              {data && data?.ingredients.length > 0 ? (
                <div className="flex flex-col flex-wrap gap-4 mt-2">
                  {data?.ingredients.map((item, i) => (
                    <div key={i} className="flex ">
                      <div>{item.name}</div>
                      <Badge key={i} className="ml-1 bg-gray300 text-gray700 hover:bg-gray300">
                        {item.quantity || '적당히'}
                        {item.unit}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : null}

              <ListTitle title="조리순서" imgPath="/icons/receipe_icon.png" />

              <div className="grid grid-cols-3 gap-6 py-4 mt-4 place-items-start">
                {data?.details.map((item, i) => (
                  <Card
                    key={i}
                    className="min-h-[20rem] gap-4"
                    description={`${i + 1}. ${item.description}`}
                    imageUrl={item.imageUrl}
                    lineClamp={2}
                  />
                ))}
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
                <div className="flex items-center justify-around p-4 border border-gray-300 shadow-md min-h-40 rounded-xl">
                  <div>
                    <p className="text-lg font-semibold leading-8 text-primary">
                      아직 댓글이 없는 게시글이에요. <br />첫 댓글의 주인공이 되어보세요!
                    </p>
                  </div>
                  <img className="w-32 h-32" src="/icons/notFound.svg" alt="" />
                </div>
              )}
            </div>
          </>
        ) : (
          <Spinner>레시피를 불러오고 있어요 ...</Spinner>
        )}
      </Layout>
    </>
  );
};

export default RecipeDetail;
