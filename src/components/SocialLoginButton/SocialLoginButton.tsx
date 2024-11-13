import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';
import { ReactNode } from 'react';

/**
 * 로그인 페이지에서 사용하는 소셜 로그인 버튼
 */

const buttonVariants = cva('flex gap-6 items-center w-full', {
  variants: {
    variant: {
      kakao: 'bg-[#fae300] hover:bg-[#fada0a] active:bg-[#fada0a] text-[#391b1b]',
      naver: 'bg-green-500 hover:bg-green-600 active:bg-green-700 text-white',
      google: 'bg-[#fff] hover:bg-[#efefef] active:bg-[#efefef] text-[#391b1b] border',
    },
  },
});

type SocialLoginButtonPropsType = {
  onSubmit: () => void;
  children: ReactNode;
  className?: string;
} & VariantProps<typeof buttonVariants>;

const SocialLoginButton = ({ className, variant, children, ...props }: SocialLoginButtonPropsType) => {
  const { onSubmit } = props;
  return (
    <Button className={cn(buttonVariants({ variant }), className)} onClick={onSubmit}>
      {children}
    </Button>
  );
};

export default SocialLoginButton;
