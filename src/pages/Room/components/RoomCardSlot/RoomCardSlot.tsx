import dayjs from 'dayjs';
import { DateSlot } from '@/pages/Main/components/DateSlot';
import { MessageCircle } from 'lucide-react';

type TRoomCardSlot = {
  createdAt: string;
  commentCount: number;
};

const RoomCardSlot = ({ createdAt, commentCount }: TRoomCardSlot) => {
  return (
    <div className="flex justify-between items-center">
      <DateSlot dateTime={dayjs(createdAt).format('YYYY-MM-DD')} />
      <div className="flex gap-1 items-center">
        <MessageCircle className="w-4 h-4" />
        <span className="text-sm font-light">{commentCount}</span>
      </div>
    </div>
  );
};

export default RoomCardSlot;
