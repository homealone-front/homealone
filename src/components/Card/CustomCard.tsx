import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

import { Clock, CreditCard, Heart } from 'lucide-react';

export interface CustomCardPropsType {
  /**
   * 없으면 텍스트 카드
   */
  imgPath?: string;

  /**
   * n줄 효과
   */
  lineClamp: 1 | 2;

  /**
   * 좋아요 갯수
   */
  likes: number;

  /**
   * 게시글 날짜
   */
  dateTime?: string;

  cookInfo?: {
    /**
     * 요리시간
     */
    cookTime: string;

    /**
     * 재료가격
     */
    cookPrice: string;
  };
}

const CustomCard = (props: CustomCardPropsType) => {
  const { imgPath, lineClamp, dateTime, cookInfo, likes } = props;

  return (
    <Card className="w-[300px] m-auto cursor-pointer transition-transform duration-500 ease-out hover:-translate-y-2.5 hover:shadow-xl">
      <CardHeader
        className={`relative rounded-t-lg p-1 ${
          imgPath ? `h-56 bg-[url('${imgPath}')] bg-cover bg-no-repeat grid place-items-center` : 'hidden'
        }`}
      >
        {imgPath ? (
          <div className="flex gap-1 items-center rounded-2xl bg-gray400 opacity-70 px-2 py-1 mt-auto ml-auto">
            <Heart fill="#fff" stroke="#fff" className="w-3 h-3" />
            <span className="text-white font-extralight text-sm">{likes}</span>
          </div>
        ) : null}
      </CardHeader>
      <CardContent className="py-2 px-3">
        <h3 className="mb-2 text-lg font-semibold truncate">치즈돈까스(후에 서버데이터로)</h3>
        <p className={`text-md text-gray500 max-w-xs mb-4  ${lineClamp === 1 ? 'truncate' : 'line-clamp-2'}`}>
          (후에 서버 데이터로 교체)Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus dolor placeat repellat
          corrupti in rem error excepturi natus a nihil. Molestiae architecto ut corrupti accusamus nihil laboriosam
          odio consequuntur exercitationem?
        </p>
        <div className="mb-2">
          {dateTime ? (
            <span className="text-gray500 text-sm font-light">{dateTime}</span>
          ) : (
            <div className="flex items-center gap-2">
              <div className="flex gap-1 items-center">
                <Clock className="w-4 h-4" />
                <span className="text-sm font-light">{cookInfo?.cookTime}</span>
              </div>
              <div className="flex gap-1 items-center">
                <CreditCard className="w-4 h-4" />
                <span className="text-sm font-light">{cookInfo?.cookPrice}</span>
              </div>
            </div>
          )}
        </div>
        <Separator />
      </CardContent>
      <CardFooter className="flex items-center gap-2 pb-2 px-3">
        <div className="flex items-center gap-2">
          <Avatar className="w-4 h-4">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <span className="font-extralight text-sm">(후에 서버데이터)홍길동</span>
        </div>

        {!imgPath ? (
          <div className="flex gap-1 items-center rounded-2xl bg-gray400 opacity-70 px-2 py-1 mt-auto ml-auto">
            <Heart fill="#fff" stroke="#fff" className="w-3 h-3" />
            <span className="text-white font-extralight text-sm">{likes}</span>
          </div>
        ) : null}
      </CardFooter>
    </Card>
  );
};

export default CustomCard;
