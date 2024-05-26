import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface AlertPropsType {
  title: string;
  content: string;
  submitButtonText: string;

  isOpen: boolean;
  onSubmit: () => void;
}

const Alert = (props: AlertPropsType) => {
  const { title, content, submitButtonText, isOpen, onSubmit } = props;

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
