import { Button } from '@/components/ui/button';
import { Confirm } from '@/components/Confirm';

import { useDisclosure } from '@/hooks/useDisclosure';

const Main = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>
      메인페이지
      <Confirm
        title="포스트 삭제"
        content="정말로 삭제하시겠습니까?"
        submitButtonText="삭제"
        isOpen={isOpen}
        onSubmit={onClose}
        onClose={onClose}
      />
      <Button onClick={onOpen}>confirm 공통컴포넌트</Button>
    </div>
  );
};

export default Main;
