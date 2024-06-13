import { Button } from '@/components/ui/button';

type KakaoButtonPropsType = {
  buttonText: string;
  onSubmit: () => void;
};
/**
 * 로그인, 회원가입 페이지에서 사용하는 카카오 버튼
 */
const KakaoButton = (props: KakaoButtonPropsType) => {
  const { buttonText, onSubmit } = props;
  return (
    <Button
      className="bg-[#fae300] hover:bg-[#fada0a] active:bg-[#fada0a] text-[#391b1b] flex gap-6 items-center  w-full"
      onClick={onSubmit}
    >
      <img src={'/icons/kakaologo.svg'} alt={'kakaologo'} />
      {buttonText}
    </Button>
  );
};

export default KakaoButton;
