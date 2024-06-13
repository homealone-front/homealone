import { Button } from '@/components/ui/button';

import { getKoreanDate, getPostPath } from './util';
import { useNavigate } from 'react-router-dom';

import { CommentListResponse } from '@/api/comment/commentListGetFetch';

import { useModalStore } from '@/store/useModalStore';
import { Confirm } from '@/components/Confirm';
import { useCommentDeleteMutation } from '@/services/comment/useCommentDeleteMutation';

interface CommentCardPropsType extends CommentListResponse {}

/**
 * 댓글 카드 컴포넌트
 */
const CommentCard = (props: CommentCardPropsType) => {
  const { id, postId, content, modifiedAt, postTitle, postType } = props;

  const onOpen = useModalStore((state) => state.onOpen);
  const setModal = useModalStore((state) => state.setModal);
  const onClose = useModalStore((state) => state.onClose);

  const { mutate } = useCommentDeleteMutation();

  const navigate = useNavigate();

  const handleNavigate = () => {
    const path = getPostPath(postType, postId);
    navigate(path);
  };

  const handleRemoveComment = () => {
    mutate({ commentId: id });

    onClose();
  };

  return (
    <div className="w-full flex items-center justify-between px-6 py-4 border-gray200 border-b hover:bg-gray50 ">
      <div className="flex flex-col gap-1">
        <div className="text-xs text-gray400">{getKoreanDate(modifiedAt)}</div>
        <div className="text-sm text-gray600">{content}</div>
        <div className="flex items-center">
          <img className="w-auto h-[0.688rem] mr-1 mb-[0.01rem]" src="/icons/post_icon.svg" alt="글 아이콘" />
          <span className="text-xs font-light text-gray400">{postTitle}</span>
        </div>
      </div>
      <div className="flex gap-2 text-xs text-gray400 ml-auto ">
        <Button
          className="rounded-none text-gray700 hover:bg-white hover:border-gray400"
          variant="outline"
          onClick={handleNavigate}
        >
          수정
        </Button>
        <Button
          className="rounded-none text-gray700  hover:bg-white hover:border-gray400"
          variant="outline"
          onClick={() => {
            setModal(
              <Confirm
                title="댓글 삭제"
                content="댓글을 삭제하시겠어요?"
                submitButtonText="삭제"
                onSubmit={handleRemoveComment}
                onClose={onClose}
              />,
            );

            onOpen();
          }}
        >
          삭제
        </Button>
      </div>
    </div>
  );
};

export default CommentCard;
