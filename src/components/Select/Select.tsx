import { Controller, useFormContext } from 'react-hook-form';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

export interface CustomSelectPropsType {
  name: string;
  label?: string;
  id?: string;
  options: {
    value: string;
    item: string;
  }[];
}

const CustomSelect = (props: CustomSelectPropsType) => {
  const { options, label, id, name } = props;

  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange } }) => (
        <>
          {label ? (
            <Label className="mb-2 flex items-center" htmlFor={id}>
              {label}
            </Label>
          ) : null}
          <Select value={value} onValueChange={onChange}>
            <SelectTrigger className="w-[9rem]">{value}</SelectTrigger>
            <SelectContent id={id} className="border-2 focus:border-primary">
              <SelectGroup>
                {options.map((option, i) => (
                  <SelectItem key={i} value={option.value} aria-selected>
                    {option.item}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </>
      )}
    />
  );
};

export default CustomSelect;
