import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const UserAvatar = ({ userImage, userName }: { userImage?: string; userName?: string }) => {
  return (
    <div className="flex gap-2 items-center text-sm">
      <Avatar>
        <AvatarImage src={userImage ?? '/icons/no_image.png'} />
        <AvatarFallback>{userName || 'NA'}</AvatarFallback>
      </Avatar>
      <span className="text-lg">{userName || 'NA'}</span>
    </div>
  );
};

export default UserAvatar;
