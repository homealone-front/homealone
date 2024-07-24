import { ThumbsUp } from 'lucide-react';

export type ThumbsUpIconProps = {
  isUserLiked?: boolean;
};

const ThumbsUpIcon = ({ isUserLiked }: ThumbsUpIconProps) => {
  const ThumbsUpColor = isUserLiked ? '#F2D03C' : '#dedede';

  return <ThumbsUp fill={ThumbsUpColor} color={ThumbsUpColor} strokeWidth={1} size={16} />;
};

export default ThumbsUpIcon;
