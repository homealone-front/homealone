import { ThumbsUp } from 'lucide-react';

export type ThumbsUpIconProps = {
  isUserLiked: boolean | undefined;
};

const ThumbsUpIcon = ({ isUserLiked }: ThumbsUpIconProps) => {
  return (
    <ThumbsUp
      fill={isUserLiked ? '#F2D03C' : '#dedede'}
      color={isUserLiked ? '#F2D03C' : '#dedede'}
      strokeWidth={1}
      size={16}
    />
  );
};

export default ThumbsUpIcon;
