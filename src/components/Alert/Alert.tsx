import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface AlertPropsType {
  /**
   * alert title
   */
  title: string;

  /**
   * alert 컨텐츠
   */
  content: string;

  /**
   * 버튼 텍스트
   */
  submitButtonText: string;

  /**
   * 열거에요?
   */
  isOpen?: boolean;

  /**
   * 버튼을 눌렀을 때 실행하는 함수
   */
  onSubmit: () => void;
}

/**
 * @example
 *   <Alert
      title="비정상적인 접근"
      content="이미 로그인 되어있습니다."
      isOpen={accessToken !== ''}
      submitButtonText="확인"
      onSubmit={() => navigate(PATH.root)}
    />
 */
const Alert = (props: AlertPropsType) => {
  const { title, content, submitButtonText, isOpen = true, onSubmit } = props;

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">{content}</div>
        <DialogFooter>
          <Button onClick={onSubmit}>{submitButtonText}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Alert;
