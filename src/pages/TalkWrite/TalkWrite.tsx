import { useMemo, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { CircleCheck, CircleXIcon, Undo2 } from 'lucide-react';
import ReactQuill from 'react-quill';
import * as yup from 'yup';

import { Appbar } from '@/components/Appbar';
import { Spinner } from '@/components/Spinner';
import { Button } from '@/components/ui/button';
import { Layout } from '@/layout';
import { ListTitle } from '../Main/components/ListTitle';

import { PATH } from '@/constants/paths';
import { Input } from '@/components/Input';
import { QuillEditor } from '@/components/QuillEditor';

import { talkSchema } from './validator';
import { yupResolver } from '@hookform/resolvers/yup';
import { writeTalkPostFetch } from '@/api/talk/writeTalkPostFetch';
import { isAxiosError } from 'axios';
import { useToast } from '@/hooks/useToast';
import { TOAST } from '@/constants/toast';
import { useNavigate } from 'react-router-dom';

export type TalkSchemaType = yup.InferType<typeof talkSchema>;

/**
 * 혼잣말 작성 페이지
 *
 */
const TalkWrite = () => {
  const navigate = useNavigate();

  const { toast } = useToast();

  const [displaySpinner, setDisplaySpinner] = useState<boolean>(false);

  const method = useForm({
    resolver: yupResolver(talkSchema),
    defaultValues: {
      title: '',
      content: '',
      tags: [
        {
          tagName: '',
        },
      ],
    },
  });

  const {
    handleSubmit: submit,
    control,
    getValues,
    formState: { errors },
  } = method;

  const quillRef = useRef<ReactQuill>(null);

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ color: [] }, { background: [] }],
          [{ align: [] }, 'link'],
        ],
      },
    };
  }, []);

  const handleSubmit = submit(async () => {
    try {
      setDisplaySpinner(true);
      const writeTalkParams = await getValues();
      const response = await writeTalkPostFetch(writeTalkParams);
      // console.info('최종 파라미터를 확인한다.', writeTalkParams);
      // console.info('작성 파라미터를 확인한다.', getalues());

      toast({
        title: '혼잣말을 등록했어요!',
        icon: <CircleCheck />,
        className: TOAST.success,
      });

      navigate(`${PATH.talk}/${response.data.id}`);
    } catch (error) {
      console.error(error);

      if (isAxiosError(error)) {
        setDisplaySpinner(false);

        toast({
          title: error?.response?.data.message || '혼잣말 등록 실패',
          icon: <CircleXIcon />,
          className: TOAST.error,
        });
      }
    }
  });

  return (
    <>
      {displaySpinner ? <Spinner>혼잣말을 등록 중 이에요 ... </Spinner> : null}
      <Appbar />
      <Layout>
        <Button variant="ghost" className="flex items-center gap-2" onClick={() => navigate(PATH.talk)}>
          <Undo2 />
          <span className="text-xl">돌아갈래요</span>
        </Button>
        <div className="-mt-8">
          <ListTitle imgPath="/icons/single_ment.png" title="혼잣말 작성 중이에요 ..." />
        </div>
        <FormProvider {...method}>
          <div className="container w-11/12 mx-auto flex justify-between">
            <div className="w-full mb-8">
              {/* 제목 */}
              <div className="mt-8">
                <Input
                  control={control}
                  name="title"
                  type="text"
                  label="혼잣말 제목"
                  placeholder="혼잣말 제목을 입력해주세요."
                  error={errors?.title}
                />
              </div>

              {/* 내용 */}
              <div className="mt-8 h-72">
                <QuillEditor ref={quillRef} modules={modules} placeholder="혼잣말 내용을 입력해주세요." />
                {errors?.content ? (
                  <p className="mt-16 text-sm text-red-600 text-left">{errors?.content.message}</p>
                ) : null}
              </div>

              {/* 등록 버튼 */}
              <div className="mt-20 text-center">
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

export default TalkWrite;
