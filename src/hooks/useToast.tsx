import { useToast as useLibToast } from '@/components/ui/use-toast';
import { TOAST } from '@/constants/toast';
import { useRef, ReactNode } from 'react';

export interface ToastMessageType {
  title: string;
  className: ValueOf<typeof TOAST>;
  icon?: ReactNode | ReactNode[];
}

const TOAST_TIMEOUT = 1300;

export const useToast = () => {
  const { toast: toast, dismiss: libDismiss } = useLibToast();

  const dismissTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const dismiss = () => {
    if (dismissTimeoutRef.current) {
      clearTimeout(dismissTimeoutRef.current);
    }

    dismissTimeoutRef.current = setTimeout(() => {
      libDismiss();
    }, TOAST_TIMEOUT);
  };

  /**
   * title 토스트 제목
   * icon 아이콘 컴포넌트 
   * className 추가적으로 줄 tailwind 선택자
   * 
   * @example
   *  toast({
        title: data.message || '로그인 성공',
        icon: <CircleCheck />,
        className: TOAST.success,
      });
   */
  const show = ({ title, icon, className }: ToastMessageType) => {
    toast({
      title,
      icon,
      className,
    });

    dismiss();
  };

  return { toast: show };
};
