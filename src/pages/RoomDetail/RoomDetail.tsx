import { useParams } from 'react-router-dom';
import parse from 'html-react-parser';

import { Appbar } from '@/components/Appbar';
import { Marks } from '@/components/Marks';
import { Layout } from '@/layout';
import { useRoomDetailQuery } from '@/services/room/useRoomDetailQuery';

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { EmblaCarousel } from './components/EmblaCarousel';
import { EmblaOptionsType } from 'embla-carousel';
import dayjs from 'dayjs';
import { Eye, MessageSquareMore } from 'lucide-react';

// import { Comment } from '@/components/Comment';
// import { CommentForm } from '@/components/CommentForm';

/**
 * 방자랑 게시글 상세페이지
 */
const RoomDetail = () => {
  const { id: roomId } = useParams();

  // TODO: isNaN roomId 404페이지로 이동시키기
  console.info('🚀 ~ RoomDetail ~ roomId:', roomId);
  if (!roomId) return;

  const { data } = useRoomDetailQuery({ roomId });
  console.info('🚀 ~ RoomDetail ~ data:', data);

  const OPTIONS: EmblaOptionsType = {};
  const SLIDES = data?.imagesUrl;

  return (
    <>
      <Appbar />
      <Layout>
        <Marks
          onLikesSubmit={() => alert('좋아요 반영 핸들러')}
          onBookmarkSubmit={() => alert('북마크 반영 핸들러')}
          likes={40}
          isLike={true}
          isBookmark={true}
        />
        <div className="w-3/4 mx-auto flex flex-col gap-8 pb-8">
          <h3 className="text-3xl font-semibold border-b pb-4">{data?.title}</h3>
          <div className="flex items-center justify-between">
            <div className="flex gap-2 items-center text-lg">
              <Avatar>
                <AvatarImage
                  src={
                    'https://firebasestorage.googleapis.com/v0/b/homealone-adce9.appspot.com/o/images%2F2024-06-08_3cbdb5af-525e-4420-b291-4fc200e3038b.png?alt=media&token=9a750c95-5b35-4ead-9798-1d90a0727941'
                  }
                />
                <AvatarFallback>{data?.memberName}</AvatarFallback>
              </Avatar>
              By <span className="text-sm font-light">{data?.memberName}</span>
            </div>
            <div>
              <span className="text-gray500 text-sm font-light">
                {dayjs(data?.createdAt).format('YYYY년 MM월 DD일')}
              </span>
            </div>
          </div>
          <EmblaCarousel slides={SLIDES} options={OPTIONS} />
          <div className="no-tailwind">{parse(`${data?.content}`)}</div>
          <div className="flex items-center justify-between border-t pt-4">
            <div className="flex gap-2 items-center text-gray500 text-sm font-light">
              <div className="flex items-center gap-1">
                <Eye strokeWidth="1.5" />
                <span>조회수</span>
                <span>{data?.view}</span>
              </div>
              <span>·</span>
              <div className="flex items-center gap-1">
                <MessageSquareMore strokeWidth="1.5" />
                <span>댓글</span>
                <span>{data?.commentCount}</span>
              </div>
            </div>
            <div>
              <Button variant="link" className="text-gray-400">
                수정
              </Button>
              <Button variant="link" className="text-gray-400">
                삭제
              </Button>
            </div>
          </div>
        </div>
        {/* <CommentForm />
        {Array.from({ length: 14 }).map((_, index) => (
          <Comment key={index} />
        ))} */}
      </Layout>
    </>
  );
};

export default RoomDetail;
