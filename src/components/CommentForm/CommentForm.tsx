import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Textarea } from '../ui/textarea';

/**
 * @todo reacthookeform의 메서드와 상태를 맵핑해야한다.
 */
const CommentForm = () => {
  return (
    <div className="align-center mt-12 flex flex-col justify-center">
      <div className="mb-12 w-full rounded-lg border border-solid border-gray-200">
        <div className="align-center flex justify-between px-6 py-4">
          <div className="flex flex-grow	">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Textarea
              placeholder="욕설 및 비방은 상대에게 상처를 줄 수 있어요."
              className="min-h-2 resize-none border-0 ml-4 w-4/5"
            />
          </div>
          <div className="align-center flex">
            <button>
              <span className="font-semibold text-primary">댓글 남기기</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentForm;
