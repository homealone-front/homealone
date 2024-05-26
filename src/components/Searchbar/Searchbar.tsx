import { Controller, useFormContext } from 'react-hook-form';
import { Input } from '@/components/Input';

const Searchbar = () => {
  const { control } = useFormContext();

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
          placeholder="검색어를 입력해주세요!"
        />
      )}
    />
  );
};

export default Searchbar;
