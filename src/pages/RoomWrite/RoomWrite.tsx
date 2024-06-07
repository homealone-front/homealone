import { useMemo, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Undo2 } from 'lucide-react';
import ReactQuill from 'react-quill';

import { Appbar } from '@/components/Appbar';
import { Spinner } from '@/components/Spinner';
import { Button } from '@/components/ui/button';
import { Layout } from '@/layout';
import { ListTitle } from '../Main/components/ListTitle';

import { usePageMoveHandler } from '@/hooks/usePageMoveHandler';

import { PATH } from '@/constants/paths';
import { Input } from '@/components/Input';
import { QuillEditor } from '@/components/QuillEditor';

/**
 * 방자랑 작성 페이지
 *
 */
const RoomWrite = () => {
  const quillRef = useRef<ReactQuill>(null);

  const navigate = usePageMoveHandler();

  const [displaySpinner, setDisplaySpinner] = useState<boolean>(false);

  const method = useForm({
    // resolver: yupResolver(roomSchema),
    defaultValues: {
      title: '',
      content: '',
      thumbnailUrl: '',
      roomImages: [],
      tags: [],
    },
  });

  const {
    handleSubmit: submit,
    control,
    // watch,
    // getValues,
    // clearErrors,
    // setValue,
    formState: { errors },
  } = method;

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ color: [] }, { background: [] }],
          [{ align: [] }, 'link', 'image'],
        ],
      },
    };
  }, []);

  const handleSubmit = submit(async () => {
    try {
      setDisplaySpinner(true);
      // console.log(getValues());
      setDisplaySpinner(false);
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <>
      {displaySpinner ? <Spinner>방자랑을 등록 중 이에요 ... </Spinner> : null}
      <Appbar />
      <Layout>
        <Button variant="ghost" className="flex items-center gap-2" onClick={() => navigate(PATH.room)}>
          <Undo2 />
          <span className="text-xl">돌아갈래요</span>
        </Button>
        <div className="-mt-8">
          <ListTitle imgPath="/icons/room_icon.png" title="방자랑 작성 중이에요 ..." />
        </div>
        <FormProvider {...method}>
          <div className="container w-11/12 mx-auto flex justify-between">
            <div className="w-full">
              <div className="mt-8">
                <Input
                  control={control}
                  name="title"
                  type="text"
                  label="방자랑 제목"
                  placeholder="방자랑 제목을 입력해주세요."
                  error={errors?.title}
                />
              </div>
              <div className="mt-8">
                <QuillEditor ref={quillRef} modules={modules} placeholder="방자랑 내용을 입력해주세요." />
                {errors.content && <span>{errors.content.message}</span>}
              </div>
              <div className="mt-8 text-center">
                <Button className="rounded-lg w-24 text-lg" onClick={handleSubmit}>
                  등록하기
                </Button>
              </div>
            </div>
          </div>
        </FormProvider>
      </Layout>
    </>
  );
};

export default RoomWrite;
