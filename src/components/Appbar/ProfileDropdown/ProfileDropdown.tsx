import { BookMarked, LogOut, NotebookPen, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

export interface ProfileDropdownPropsType {
  isOpen: boolean;
  onOpenChange: () => void;
}

/**
 * @todo 마이페이지 토글 메뉴리스트에 링크 달기
 * @todo 이름 유저 상태값으로 교체
 */
const ProfileDropdown = (props: ProfileDropdownPropsType) => {
  const { isOpen, onOpenChange } = props;

  return isOpen ? (
    <DropdownMenu open={isOpen} onOpenChange={onOpenChange}>
      <DropdownMenuTrigger />
      <DropdownMenuContent className="w-30 fixed top-6 right-0">
        <DropdownMenuLabel className="text-center font-light text-sm">
          <span className="font-semibold">홍길동</span> 님
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
          <DropdownMenuLabel className="text-center font-light text-sm">로그아웃</DropdownMenuLabel>
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : null;
};

export default ProfileDropdown;
