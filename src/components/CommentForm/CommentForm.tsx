import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Textarea } from '../ui/textarea';
import { Controller, Control, FieldError, FieldValues, Path } from 'react-hook-form';

interface CommentFormPropsType<T extends FieldValues> {
  name: Path<T>;
  error?: FieldError;
  control: Control<T>;
  imageUrl?: string;
  onSubmit: () => void;
}

/**
 * @todo react-hook-form의 메서드와 상태를 맵핑해야 한다.
 */
const CommentForm = <T extends FieldValues>(props: CommentFormPropsType<T>) => {
  const { name, error, control, imageUrl, onSubmit } = props;
  return (
    <div className="align-center mt-12 flex flex-col justify-center">
      <div className="mb-12 w-full rounded-lg border border-solid border-gray-200">
        <div className="align-center flex justify-between px-6 py-4">
          <div className="flex flex-grow">
            <Avatar>
              <AvatarImage src={imageUrl ? imageUrl : 'https://github.com/shadcn.png'} alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Controller
              name={name}
              control={control}
              render={({ field: { onChange } }) => (
                <div className="flex flex-col ml-4 w-4/5">
                  <Textarea
                    id={name}
                    onChange={(e) => onChange(e.target.value.trim())}
                    className={`resize-none	block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300 ${
                      error ? 'border-2 border-red-500 focus-visible:outline-red-500 focus-visible:border-red-500' : ''
                    }`}
                    placeholder="욕설 및 비방은 상대에게 상처를 줄 수 있어요."
                  />
                  {error && <p className="mt-2 text-sm text-red-600 text-left">{error.message}</p>}
                </div>
              )}
            />
          </div>
          <div className="align-center flex">
            <button className="font-semibold text-primary" onClick={onSubmit}>
              댓글 남기기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentForm;
