import { useRef, ChangeEvent } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { CarouselItem } from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { CircleX, Image, ImagePlus } from 'lucide-react';

interface RoomImagesFieldsType {
  roomImages: {
    image: File;
    imageUrl: string;
  }[];
}

const RoomImagesFields = () => {
  const { control, watch, setValue } = useFormContext<Pick<RoomImagesFieldsType, 'roomImages'>>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'roomImages',
  });

  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const { files } = e.target;
    if (files && files.length > 0) {
      const file = files[0];
      const imageUrl = URL.createObjectURL(file);

      setValue(`roomImages.${index}.image`, file);
      setValue(`roomImages.${index}.imageUrl`, imageUrl);
    }
  };

  return (
    <>
      {fields?.map((item, i) => (
        <CarouselItem key={item.id} className="basis-1/3">
          <div className="p-1">
            <Card>
              <div className="flex aspect-square items-center justify-center relative group">
                <div
                  style={{
                    backgroundImage: watch(`roomImages.${i}.imageUrl`)
                      ? `url(${watch(`roomImages.${i}.imageUrl`)})`
                      : 'none',
                    backgroundSize: 'cover',
                  }}
                  className={`rounded-lg w-full h-full opacity-90 flex items-center justify-center group ${
                    watch(`roomImages.${i}.imageUrl`) ? `bg-cover bg-center bg-no-repeat` : 'bg-[#f5f5f5]'
                  }`}
                >
                  <Button
                    className={`flex gap-4 ${
                      watch(`roomImages.${i}.imageUrl`)
                        ? 'text-gray700 bg-white group-hover:flex hidden'
                        : 'text-gray400'
                    }`}
                    variant="ghost"
                    onClick={() => fileInputRefs.current[i]?.click()}
                  >
                    <Image
                      size={16}
                      color={`${watch(`roomImages.${i}.imageUrl`) ? '#2d3748' : '#a0aec0'}`}
                      strokeWidth={1.25}
                    />
                    <span>이미지 {watch(`roomImages.${i}.imageUrl`) ? '수정' : '추가'}하기</span>
                  </Button>
                </div>

                <CircleX
                  size={34}
                  strokeWidth={2}
                  fill="white"
                  color="#a0aec0"
                  className="absolute right-2 top-2 cursor-pointer hover:stroke-[#2d3748] group-hover:block hidden"
                  onClick={() => remove(i)}
                />

                <input
                  ref={(el) => (fileInputRefs.current[i] = el)}
                  className="hidden"
                  accept="image/*"
                  type="file"
                  onChange={(e) => handleFileChange(e, i)}
                />
              </div>
            </Card>
          </div>
        </CarouselItem>
      ))}

      {/* 추가하기 버튼 */}
      <CarouselItem className="basis-1/3">
        <div className="p-1">
          <Card>
            <CardContent
              className="flex aspect-square items-center justify-center cursor-pointer group pb-0"
              onClick={() => append({ image: {} as File, imageUrl: '' })}
            >
              <ImagePlus size={64} color="#a0aec0" strokeWidth={2} className=" group-hover:stroke-[#2d3748]" />
            </CardContent>
          </Card>
        </div>
      </CarouselItem>
    </>
  );
};

export default RoomImagesFields;
