import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Image, Undo2 } from 'lucide-react';
import ReactQuill from 'react-quill';
import * as yup from 'yup';

import { Spinner } from '@/components/Spinner';
import { Button } from '@/components/ui/button';

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
import { useLocation, useNavigate } from 'react-router-dom';
import { useRoomDetailQuery } from '@/services/room/useRoomDetailQuery';
import { useRoomEditMutation } from '@/services/room/useRoomEditMutation';
import { useRoomWriteMutation } from '@/services/room/useRoomWriteMutation';

export type RoomSchemaType = yup.InferType<typeof roomSchema>;

/**
 * 방자랑 작성 페이지
 *
 */
const RoomWrite = () => {
  const navigate = useNavigate();

  // 방자랑 수정 시 받아오는 roomId
  const location = useLocation();
  const roomId = location.state?.roomId;
  // roomId가 있다면 데이터 호출
  const { data: roomData } = roomId ? useRoomDetailQuery({ roomId }) : { data: null };
  // 현재 수정인지 등록인지
  const mode = roomId ? '수정' : '등록';

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

  useEffect(() => {
    if (roomData) {
      setValue('title', roomData.title);
      setValue('content', roomData.content);
      setValue('thumbnailUrl', {
        image: new File([], ''),
        imageUrl: roomData.thumbnailUrl,
      });
      setValue(
        'roomImages',
        roomData.roomImages.map((image) => ({
          image: new File([], ''),
          imageUrl: image,
        })),
      );
    }
  }, [roomData]);

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

  const { mutate: roomEditMutate } = useRoomEditMutation();
  const { mutate: roomWriteMutate } = useRoomWriteMutation();

  const handleSubmit = submit(async () => {
    try {
      setDisplaySpinner(true);
      const writeRoomParams = await getRoomCleansingData(getValues());
      // console.info('최종 파라미터를 확인한다.', writeRoomParams);
      // console.info('작성 파라미터를 확인한다.', getValues());

      if (roomId) {
        const params = {
          roomId,
          ...writeRoomParams,
        };
        await roomEditMutate(params);
      } else {
        await roomWriteMutate(writeRoomParams);
      }
      setDisplaySpinner(false);
    } catch (error) {
      setDisplaySpinner(false);
    }
  });

  return (
    <>
      {displaySpinner ? <Spinner>방자랑을 {mode} 중 이에요 ... </Spinner> : null}

      <Button variant="ghost" className="flex items-center gap-2" onClick={() => navigate(PATH.room)}>
        <Undo2 />
        <span className="text-xl">돌아갈래요</span>
      </Button>
      <div className="-mt-8">
        <ListTitle imgPath="/icons/room_icon.png" title={`방자랑 ${mode} 중이에요 ...`} />
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
                              thumbnailFile.imageUrl ? 'text-gray700 bg-white group-hover:flex hidden' : 'text-gray400'
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
                              {thumbnailFile.imageUrl || thumbnailFile.image instanceof File ? '수정' : '추가'}하기
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

            {/* submit 버튼 */}
            <div className="mt-20 text-center">
              <Button className="rounded-lg w-24 text-lg" onClick={handleSubmit}>
                {mode}하기
              </Button>
            </div>
          </div>
        </div>
      </FormProvider>
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
