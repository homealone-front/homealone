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
   * 내부적으로만 씀
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
