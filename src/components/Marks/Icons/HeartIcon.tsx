import { Heart } from 'lucide-react';

export type HeartIconProps = {
  filled: boolean | undefined;
};

const HeartIcon = ({ filled }: HeartIconProps) => {
  return <Heart fill={filled ? '#bb3433' : '#dedede'} color={filled ? '#bb3433' : '#dedede'} strokeWidth={1} />;
};

export default HeartIcon;
