import { ChangeEvent, useMemo, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Image, Undo2 } from 'lucide-react';
import ReactQuill from 'react-quill';
import * as yup from 'yup';

import { Appbar } from '@/components/Appbar';
import { Spinner } from '@/components/Spinner';
import { Button } from '@/components/ui/button';
import { Layout } from '@/layout';
import { ListTitle } from '../Main/components/ListTitle';

import { usePageMoveHandler } from '@/hooks/usePageMoveHandler';

import { PATH } from '@/constants/paths';
import { Input } from '@/components/Input';
import { QuillEditor } from '@/components/QuillEditor';

import { roomSchema } from './validator';
import { yupResolver } from '@hookform/resolvers/yup';
import { uploadImage } from '@/utils/uploadImage';
import { getRoomCleansingData } from './util';
export type RoomSchemaType = yup.InferType<typeof roomSchema>;

/**
 * 방자랑 작성 페이지
 *
 */
const RoomWrite = () => {
  const navigate = usePageMoveHandler();

  const [displaySpinner, setDisplaySpinner] = useState<boolean>(false);

  const method = useForm({
    resolver: yupResolver(roomSchema),
    defaultValues: {
      title: '',
      content: '',
      thumbnailUrl: [
        {
          image: {} as File,
          imageUrl: '',
        },
      ],
      roomImages: [],
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
    watch,
    getValues,
    clearErrors,
    setValue,
    formState: { errors },
  } = method;

  const file = watch(`thumbnailUrl.${0}`);
  const uploadRef = useRef<HTMLInputElement>(null);
  const quillRef = useRef<ReactQuill>(null);

  const quillImageHandler = () => {
    // 이미지 핸들러 시작
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.addEventListener('change', async () => {
      // 이미지 삽입
      const file = input.files && input.files[0];

      if (!file) return;

      try {
        const uploadedImage = await uploadImage(file);
        const IMG_URL = uploadedImage?.imageUrl;

        // 에디터에 보여주기
        const editor = quillRef?.current?.getEditor(); // 에디터 객체 가져오기
        const range = editor?.getSelection();
        if (!range) return;
        editor?.insertEmbed(range.index, 'image', IMG_URL);
      } catch (error) {
        console.error(error);
      }
    });
  };

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
        handlers: {
          image: quillImageHandler,
        },
      },
    };
  }, []);

  const handleUploadImage = () => {
    uploadRef.current?.click();
    clearErrors('thumbnailUrl');
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { files = [] } = e.target;

    if (files && files.length > 0) {
      const uploadFile = files[0];

      setValue(`thumbnailUrl.${0}.image`, uploadFile);

      const imageUrl = URL.createObjectURL(uploadFile);

      setValue(`thumbnailUrl.${0}.imageUrl`, imageUrl);
    }
  };

  const handleSubmit = submit(async () => {
    try {
      setDisplaySpinner(true);
      console.info('최종 파라미터를 확인한다.', await getRoomCleansingData(getValues()));
      // console.info('작성 파라미터를 확인한다.', getValues());

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
            <div className="w-full mb-8">
              <div className="upload mt-8 w-1/2 mx-auto h-72">
                <div
                  style={{
                    backgroundImage: file.imageUrl ? `url(${file.imageUrl})` : 'none',
                    backgroundSize: 'cover',
                  }}
                  className={`rounded-xl w-full h-full opacity-90 flex items-center justify-center ${
                    file && file instanceof File
                      ? `bg-cover bg-center bg-no-repeat border border-gray300`
                      : 'bg-[#f5f5f5]'
                  }`}
                >
                  <div className="flex flex-col justify-center items-center">
                    <Image size={16} color={`${file.imageUrl ? '#2d3748' : '#a0aec0'}`} strokeWidth={1.25} />
                    <Button
                      className={`${file.imageUrl ? 'text-gray700' : 'text-gray400'}`}
                      variant="ghost"
                      onClick={handleUploadImage}
                    >
                      대표이미지 {file.imageUrl && file.image instanceof File ? '수정' : '추가'}하기
                    </Button>
                  </div>
                </div>
                {errors?.thumbnailUrl?.[0]?.imageUrl ? (
                  <p className="mt-2 text-sm text-red-600 text-left">{errors?.thumbnailUrl?.[0]?.imageUrl.message}</p>
                ) : null}
                <input ref={uploadRef} className="hidden" accept="image/*" type="file" onChange={handleFileChange} />
              </div>
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
              <div className="mt-8 h-72">
                <QuillEditor ref={quillRef} modules={modules} placeholder="방자랑 내용을 입력해주세요." />
              </div>
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

export default RoomWrite;
