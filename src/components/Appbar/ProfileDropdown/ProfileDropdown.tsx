import { BookMarked, LogOut, NotebookPen, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLogout } from '@/hooks/useLogout';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

export interface ProfileDropdownPropsType {
  userName?: string;
  isOpen: boolean;
  onOpenChange: () => void;
}

/**
 * @todo 마이페이지 토글 메뉴리스트에 링크 달기
 */
const ProfileDropdown = (props: ProfileDropdownPropsType) => {
  const { userName, isOpen, onOpenChange } = props;

  const handleLogout = useLogout();

  if (!isOpen) return null;

  return (
    <DropdownMenu open={isOpen} onOpenChange={onOpenChange}>
      <DropdownMenuTrigger />
      <DropdownMenuContent className="w-30 fixed top-6 right-0">
        <DropdownMenuLabel className="text-center font-light text-sm">
          <span className="font-semibold">{userName}</span> 님
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Button className="flex items-center justify-center m-auto" variant="ghost">
          <Users className="w-4 h-4" />
          <DropdownMenuLabel className="text-center font-light text-sm">나의 정보 </DropdownMenuLabel>
        </Button>
        <Button className="flex items-center justify-center m-auto" variant="ghost">
          <NotebookPen className="w-4 h-4" />
          <DropdownMenuLabel className="text-center font-light text-sm">작성한 글</DropdownMenuLabel>
        </Button>
        <Button className="flex items-center justify-center m-auto" variant="ghost">
          <BookMarked className="w-4 h-4" />
          <DropdownMenuLabel className="text-center font-light text-sm">저장한 글</DropdownMenuLabel>
        </Button>
        <Button className="flex items-center justify-center m-auto" variant="ghost">
          <LogOut className="w-4 h-4" />
          <DropdownMenuLabel
            className="text-center font-light text-sm"
            onClick={async () => {
              await handleLogout();
            }}
          >
            로그아웃
          </DropdownMenuLabel>
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
