import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { List } from '../Li';
import { usePageMoveHandler } from '@/hooks/usePageMoveHandler';
import { PATH } from '@/constants/paths';
import { AlignJustify } from 'lucide-react';
import { useState } from 'react';

/**
 * 화면너비가 md(768px)이하일 때 쓰이는 MenuDrawer 컴포넌트
 */
const MenuDrawer = () => {
  const [open, setOpen] = useState(false);

  const navigate = usePageMoveHandler();

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger className="md:absolute md:opacity-0">
        <AlignJustify />
      </DrawerTrigger>
      <DrawerContent className="bg-[#F9F7F4]">
        <ul className="flex flex-col mb-36 mt-8">
          <List
            className="text-md py-3"
            path={PATH.root}
            onPageMove={() => {
              setOpen((prev) => !prev);
              navigate(PATH.root);
            }}
          >
            홈
          </List>
          <List
            className="text-md py-3"
            path={PATH.recipe}
            onPageMove={() => {
              setOpen((prev) => !prev);
              navigate(PATH.recipe);
            }}
          >
            레시피
          </List>
          <List
            className="text-md py-3"
            path={PATH.room}
            onPageMove={() => {
              setOpen((prev) => !prev);
              navigate(PATH.room);
            }}
          >
            방자랑
          </List>
          <List
            className="text-md py-3"
            path={PATH.talk}
            onPageMove={() => {
              setOpen((prev) => !prev);
              navigate(PATH.talk);
            }}
          >
            혼잣말
          </List>
        </ul>
      </DrawerContent>
    </Drawer>
  );
};

export default MenuDrawer;
