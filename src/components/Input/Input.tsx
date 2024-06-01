import { Controller, Control, FieldError, FieldValues, Path } from 'react-hook-form';

import { useExtractNumberHandler } from '@/hooks/useExtractNumberHandler';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { InputButtonPropsType } from '../InputButton/InputButton';
import { InputButton } from '../InputButton';

interface CustomInputPropsType<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  helperText?: string;
  error?: FieldError;

  type: 'email' | 'text' | 'password';
  control: Control<T>;

  /**
   * onlyNumber
   */
  extractNumber?: boolean;

  addon?: InputButtonPropsType;

  value?: string;
  placeholder?: string;
  maxLength?: number;
  disabled?: boolean;
}

/**
 * ReactHookForm 과 같이 사용하기 위한 Tailwind InputForm 컴포넌트
 */
const CustomInput = <T extends FieldValues>(props: CustomInputPropsType<T>) => {
  const { name, label, addon, control, type, error, helperText, extractNumber = false, ...rest } = props;

  const handleExtractNumber = useExtractNumberHandler();

  return (
    <div className={`form-control ${error ? 'is-invalid' : ''}`}>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange } }) => (
          <div className="w-full">
            {label ? (
              <div className="flex items-center mb-2">
                <Label htmlFor={name} className="block text-gray-700">
                  {label}
                </Label>
              </div>
            ) : null}

            <div className="relative">
              <Input
                id={name}
                type={type}
                onChange={
                  extractNumber
                    ? (e) => {
                        handleExtractNumber(e);
                        onChange(e);
                      }
                    : onChange
                }
                className={`block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300 ${
                  error ? 'border-2 border-red500 focus-visible:outline-red500 focus-visible:border-red500' : ''
                } `}
                {...rest}
              />
              {addon ? (
                <InputButton
                  buttonText={addon?.buttonText}
                  leftIcon={addon?.leftIcon}
                  backgroundColor={addon?.backgroundColor}
                  color={addon?.color}
                  onSubmit={addon?.onSubmit}
                  disabled={addon?.disabled}
                />
              ) : null}
            </div>
            {error ? (
              <p className="mt-2 text-sm text-red-600 text-left">{error?.message}</p>
            ) : helperText ? (
              <p className="mt-2 text-sm text-gray-500 text-left">{helperText}</p>
            ) : null}
          </div>
        )}
      />
    </div>
  );
};

export default CustomInput;
