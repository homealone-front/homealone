import { useLocation } from 'react-router-dom';
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
import { yupResolver } from '@hookform/resolvers/yup';
import { commentSchema } from './validator';
import { addCommentPostFetch } from '@/api/comment/addCommentPostFetch';
import { Card } from '@/components/Card';
import { ListTitle } from '../Main/components/ListTitle';

/**
 * 레시피 게시글 상세페이지
 */
const ReciepeDetail = () => {
  const { pathname } = useLocation();

  const id = pathname.split('/')[2];
  const userId = useUserStore((state) => state.id);

  const { data } = useRecipeDetailQuery({ id });

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
    formState: { errors },
  } = method;

  const handleSubmit = submit(async () => {
    try {
      const addParams = {
        ...getValues(),
        postId: parseInt(id, 10),
      };

      const addRes = await addCommentPostFetch(addParams);

      console.info(addRes);
      await commentRefetch();
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <>
      <Appbar />

      <Layout>
        <Marks
          onLikesSubmit={() => alert('좋아요 반영 핸들러')}
          onBookmarkSubmit={() => alert('북마크 반영 핸들러')}
          likes={40}
          isLike={true}
          isBookmark={true}
        />
        <div className="w-3/4 mx-auto">
          <div className="flex gap-2 items-center text-lg">
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

          <div className="mt-8 flex gap-2 flex-col justify-center">
            <h3 className="text-2xl font-semibold">{data?.title}</h3>
            <p className="text-lg font-light">{data?.description}</p>
          </div>

          <img className="mt-6 rounded-lg" src={data?.images[0].imageUrl} alt="" />
          {data && data?.postTags.length > 0 ? (
            <div className="mt-2">
              {data?.postTags.map((item, i) => (
                <Badge key={i} className="bg-gray300 text-gray700 hover:bg-gray300 ml-1">
                  {item.tagName}
                </Badge>
              ))}
            </div>
          ) : null}

          <ListTitle title="재료" imgPath="/icons/receipe_icon.png" />
          {data && data?.ingredients.length > 0 ? (
            <div className="mt-2 flex flex-wrap flex-col gap-4">
              {data?.ingredients.map((item, i) => (
                <div key={i} className="flex ">
                  <div>{item.name}</div>
                  <Badge key={i} className="bg-gray300 text-gray700 hover:bg-gray300 ml-1">
                    {item.quantity || '적당히'}
                    {item.unit}
                  </Badge>
                </div>
              ))}
            </div>
          ) : null}

          <ListTitle title="조리순서" imgPath="/icons/receipe_icon.png" />

          <div className="mt-4 grid grid-cols-3 gap-6 place-items-start py-4">
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
            imageUrl={data?.images[0].imageUrl}
            error={errors?.content}
            onSubmit={handleSubmit}
          />
          {commentFetching
            ? null
            : commentData?.map((item) => <Comment key={item.id} write={userId === item?.memberId} {...item} />)}
        </div>
      </Layout>
    </>
  );
};

export default ReciepeDetail;
