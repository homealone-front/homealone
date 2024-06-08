import { CommentListResponse } from '@/api/comment/commentListGetFetch';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ThumbsUp } from 'lucide-react';
import dayjs from 'dayjs';

// 'border-b border-gray-200'
/**
 * 댓글 리스트 공통 컴포넌트
 * - 수정이 필요한 컨텐츠에 reacthookform 상태를 매핑한다.
 */

interface CommentPropsType extends Omit<CommentListResponse, 'message'> {
  write: boolean;
}
const Comment = (props: CommentPropsType) => {
  const { write, ...rest } = props;

  const getRelativeTime = (dateString: string) => {
    // 한국 시간대(KST)로 변환
    const givenDate = dayjs.tz(dateString, 'Asia/Seoul');
    const now = dayjs().tz('Asia/Seoul');

    // 오늘과 비교하여 상대 시간 반환
    return givenDate.from(now);
  };

  return (
    <div className="h-fit w-full">
      <div className="flex gap-4 p-4">
        <Avatar className="w-7 h-7">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-start gap-3">
          <ul className="flex items-center justify-center gap-2 text-xs text-gray-400">
            <li className="font-normal text-black">{rest.memberName}</li>
            <li>{getRelativeTime(rest.modifiedAt)}</li>
          </ul>
          <p className="text-sm">{rest.content}</p>
          <div className="flex items-center justify-center gap-2">
            <button className="flex items-center justify-center gap-1">
              <ThumbsUp size={16} color="#9ca3af" strokeWidth={1} /> <span className="text-xs text-gray-400">0</span>
            </button>
          </div>
        </div>
        {write ? (
          <ul className="flex gap-2 text-xs text-gray400 ml-auto">
            <li>수정</li>
            <li>삭제</li>
          </ul>
        ) : null}
      </div>
    </div>
  );
};

export default Comment;
