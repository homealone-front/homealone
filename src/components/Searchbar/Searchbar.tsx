import { Controller, FieldValues, useFormContext } from 'react-hook-form';
import { Input } from '@/components/Input';
import { Search } from 'lucide-react';
import { Select } from '@radix-ui/react-select';
import { CATEGORY_OPTIONS } from '@/pages/Main/constants';

export interface SearchBarProps {
  onSearch?: (params: FieldValues) => void;
}

const Searchbar = ({ onSearch }: SearchBarProps) => {
  const { control, getValues } = useFormContext();

  const handleSearchBtn = () => {
    const searchValue = getValues();
    // console.info('검색값', searchValue);
    onSearch && onSearch(searchValue);
  };

  return (
    <>
      <Controller
        name="category"
        control={control}
        render={({ field }) => <Select {...field} options={CATEGORY_OPTIONS} />}
      />
      <Controller
        name="keyword"
        control={control}
        render={({ field: { value } }) => (
          <Input
            name="keyword"
            control={control}
            type="text"
            extractNumber={false}
            value={value}
            placeholder="검색어를 입력해주세요!"
          />
        )}
      />
      <button onClick={handleSearchBtn}>
        <Search className="absolute top-[0.5rem] right-[0.6rem] appearance-none" stroke="#737373" />
      </button>
    </>
  );
};

export default Searchbar;
