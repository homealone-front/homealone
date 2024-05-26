import { Controller, useFormContext } from 'react-hook-form';
import { Input } from '@/components/Input';

const Searchbar = () => {
  const { control, watch } = useFormContext();

  const currentCategory = watch('category');

  return (
    <Controller
      name="query"
      control={control}
      render={({ field: { value } }) => (
        <Input
          name="query"
          control={control}
          type="text"
          extractNumber={false}
          value={value}
          placeholder={
            currentCategory === '전체'
              ? '검색어를 입력해주세요!'
              : currentCategory === '레시피'
              ? '오늘은 어떤 요리를 해볼까요?'
              : currentCategory === '방자랑'
              ? '본인만의 인테리어가 있으신가요?'
              : '오늘은 어떤 얘기를 하고 싶으신가요?'
          }
        />
      )}
    />
  );
};

export default Searchbar;
