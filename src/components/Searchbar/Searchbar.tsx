import { FormEvent } from 'react';
import { Controller, FieldValues, useFormContext } from 'react-hook-form';
import { Input } from '@/components/Input';
import { Search } from 'lucide-react';

export interface SearchBarProps {
  onSearch?: (params: FieldValues) => void;
}

const Searchbar = ({ onSearch }: SearchBarProps) => {
  const { control, getValues } = useFormContext();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch?.(getValues());
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="relative">
        <Controller
          name="query"
          control={control}
          render={({ field }) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { ref, ...rest } = field;

            return (
              <Input
                {...rest}
                control={control}
                name="query"
                type="text"
                extractNumber={false}
                placeholder="검색어를 입력해주세요!"
              />
            );
          }}
        />
        <button type="submit" className="absolute top-[0.5rem] right-[0.6rem] appearance-none">
          <Search stroke="#737373" />
        </button>
      </form>
    </>
  );
};

export default Searchbar;
