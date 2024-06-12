import { Bookmark } from 'lucide-react';

export type BookmarkIconProps = {
  filled: boolean | undefined;
};

const BookmarkIcon = ({ filled }: BookmarkIconProps) => {
  return <Bookmark fill={filled ? '#F2D03C' : '#dedede'} color={filled ? '#F2D03C' : '#dedede'} strokeWidth={1} />;
};

export default BookmarkIcon;
