import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ThumbsUp } from 'lucide-react';

// 'border-b border-gray-200'
/**
 * 댓글 리스트 공통 컴포넌트
 * - 수정이 필요한 컨텐츠에 reacthookform 상태를 매핑한다.
 */
const Comment = () => {
  return (
    <div className="h-fit w-full">
      <div className="flex gap-4 p-4">
        <Avatar className="w-7 h-7">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-start gap-3">
          <ul className="flex items-center justify-center gap-2 text-xs text-gray-400">
            <li className="font-normal text-black">홍길동</li>
            <li>16일전</li>
          </ul>
          <p className="text-sm">
            안녕하세요. 혼잣말 잘하시네요. 안녕하세요. 혼잣말 잘하시네요.안녕하세요. 혼잣말 잘하시네요. 안녕하세요.
            혼잣말 잘하시네요.
          </p>
          <div className="flex items-center justify-center gap-2">
            <button className="flex items-center justify-center gap-1">
              <ThumbsUp size={16} color="#9ca3af" strokeWidth={1} /> <span className="text-xs text-gray-400">0</span>
            </button>
          </div>
        </div>
        <ul className="flex gap-2 text-xs text-gray400">
          <li>수정</li>
          <li>삭제</li>
        </ul>
      </div>
    </div>
  );
};

export default Comment;
