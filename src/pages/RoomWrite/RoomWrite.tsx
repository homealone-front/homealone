import { ChangeEvent, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { CircleCheck, CircleXIcon, Image, Undo2 } from 'lucide-react';
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

import { roomSchema } from './validator';
import { yupResolver } from '@hookform/resolvers/yup';
import { getRoomCleansingData } from './util';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Card } from '@/components/ui/card';
import { RoomImagesFields } from './components/RoomImagesFields';
import { writeRoomPostFetch } from '@/api/room/writeRoomPostFetch';
import { isAxiosError } from 'axios';
import { useToast } from '@/hooks/useToast';
import { TOAST } from '@/constants/toast';
import { useNavigate } from 'react-router-dom';

export type RoomSchemaType = yup.InferType<typeof roomSchema>;

/**
 * 방자랑 작성 페이지
 *
 */
const RoomWrite = () => {
  // TODO: 비회원 접근 불가 라우트 설정하기
  const navigate = useNavigate();

  const { toast } = useToast();

  const [displaySpinner, setDisplaySpinner] = useState<boolean>(false);

  const method = useForm({
    resolver: yupResolver(roomSchema),
    defaultValues: {
      title: '',
      content: '',
      thumbnailUrl: {
        image: {} as File,
        imageUrl: '',
      },
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

  const thumbnailFile = watch(`thumbnailUrl`);
  const uploadRef = useRef<HTMLInputElement>(null);
  const quillRef = useRef<ReactQuill>(null);

  const handleUploadImage = () => {
    uploadRef.current?.click();
    clearErrors('thumbnailUrl');
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { files = [] } = e.target;

    if (files && files.length > 0) {
      const uploadFile = files[0];
      const imageUrl = URL.createObjectURL(uploadFile);

      setValue(`thumbnailUrl.image`, uploadFile);
      setValue(`thumbnailUrl.imageUrl`, imageUrl);
    }
  };

  const handleSubmit = submit(async () => {
    try {
      // console.info('최종 파라미터를 확인한다.', writeRoomParams);
      console.info('작성 파라미터를 확인한다.', getValues());

      setDisplaySpinner(true);
      const writeRoomParams = await getRoomCleansingData(getValues());
      const response = await writeRoomPostFetch(writeRoomParams);
      const createRoomId = response.data.id;

      toast({
        title: '방자랑 등록 성공',
        icon: <CircleCheck />,
        className: TOAST.success,
      });

      setDisplaySpinner(false);

      // 등록 성공 후, 해당 게시글로 이동
      navigate(`${PATH.room}/${createRoomId}`);
    } catch (error) {
      console.error(error);

      if (isAxiosError(error)) {
        toast({
          title: error?.response?.data.message || '방자랑 등록 실패',
          icon: <CircleXIcon />,
          className: TOAST.error,
        });
      }
      setDisplaySpinner(false);
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
              {/* 대표 이미지, 추가 이미지 업로드 */}
              <Carousel
                opts={{
                  align: 'start',
                }}
                className="w-full"
              >
                <CarouselContent>
                  <CarouselItem className="basis-1/3">
                    <div className="p-1">
                      <Card>
                        <div className="flex aspect-square items-center justify-center">
                          <div
                            style={{
                              backgroundImage: thumbnailFile.imageUrl ? `url(${thumbnailFile.imageUrl})` : 'none',
                              backgroundSize: 'cover',
                            }}
                            className={`rounded-lg w-full h-full opacity-90 flex items-center justify-center group ${
                              thumbnailFile.imageUrl ? `bg-cover bg-center bg-no-repeat` : 'bg-[#f5f5f5]'
                            }`}
                          >
                            <Button
                              className={`flex gap-4 ${
                                thumbnailFile.imageUrl
                                  ? 'text-gray700 bg-white group-hover:flex hidden'
                                  : 'text-gray400'
                              }`}
                              variant="ghost"
                              onClick={handleUploadImage}
                            >
                              <Image
                                size={16}
                                color={`${thumbnailFile.imageUrl ? '#2d3748' : '#a0aec0'}`}
                                strokeWidth={1.25}
                              />
                              <span>
                                대표 이미지{' '}
                                {thumbnailFile.imageUrl && thumbnailFile.image instanceof File ? '수정' : '추가'}하기
                              </span>
                            </Button>
                          </div>
                          <input
                            ref={uploadRef}
                            className="hidden"
                            accept="image/*"
                            type="file"
                            onChange={handleFileChange}
                          />
                        </div>
                      </Card>
                      {errors?.thumbnailUrl?.imageUrl ? (
                        <p className="mt-2 text-sm text-red-600 text-left">{errors?.thumbnailUrl?.imageUrl.message}</p>
                      ) : null}
                    </div>
                  </CarouselItem>
                  <RoomImagesFields />
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>

              {/* 제목 */}
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

              {/* 내용 */}
              <div className="mt-8 h-72">
                <QuillEditor ref={quillRef} modules={modules} placeholder="방자랑 내용을 입력해주세요." />
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

export default RoomWrite;

/**
 * QuillEditor 모듈 설정
 */
const modules = {
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
