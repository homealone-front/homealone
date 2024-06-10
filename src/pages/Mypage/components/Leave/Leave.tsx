import { Button } from '@/components/ui/button';
import { useModalStore } from '@/store/useModalStore';
import { Confirm } from '@/components/Confirm';
import { useLeaveMutation } from '@/services/member/useLeaveMutation';
import { useUserStore } from '@/store/useUserStore';

/**
 * 회원 탈퇴 컴포넌트
 */

const Leave = () => {
  const onOpen = useModalStore((state) => state.onOpen);
  const setModal = useModalStore((state) => state.setModal);
  const onClose = useModalStore((state) => state.onClose);

  const id = useUserStore((state) => state.id) as number;
  const { mutate } = useLeaveMutation();

  const leaveMember = () => {
    mutate({ id: id });

    onClose();
  };
  const handleSubmit = () => {
    setModal(
      <Confirm
        title="회원 탈퇴"
        content="나홀로 집에서 회원을 정말 탈퇴하시겠습니까?"
        submitButtonText="확인"
        onSubmit={leaveMember}
        onClose={onClose}
      />,
    );

    onOpen();
  };

  return (
    <div className="flex py-9 mb-20">
      <div>
        <div className="text-sm mb-0.5 text-gray-600">회원탈퇴</div>
        <span className="text-sm text-gray-400">
          탈퇴 시 작성하신 게시글 및 댓글이 모두 삭제되며 복구되지 않습니다.
        </span>
      </div>

      <Button className="ml-auto" variant="destructive" onClick={handleSubmit}>
        회원탈퇴
      </Button>
    </div>
  );
};

export default Leave;
