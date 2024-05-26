import { Controller, useFormContext } from 'react-hook-form';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger } from '@/components/ui/select';
import { CategoryType } from '@/pages/Main/constants';

export interface CustomSelectPropsType {
  options: {
    value: CategoryType;
    item: CategoryType;
  }[];
}

const CustomSelect = (props: CustomSelectPropsType) => {
  const { options } = props;

  const { control } = useFormContext();

  return (
    <Controller
      name="category"
      control={control}
      render={({ field: { value, onChange } }) => (
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger className="w-[6rem]">{value}</SelectTrigger>
          <SelectContent className="border-2 focus:border-primary">
            <SelectGroup>
              {options.map((option, i) => (
                <SelectItem key={i} value={option.value} aria-selected>
                  {option.item}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      )}
    />
  );
};

export default CustomSelect;
