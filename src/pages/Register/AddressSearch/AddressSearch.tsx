import { useRef, useState } from 'react';
import { Control, FieldError } from 'react-hook-form';

import { Input } from '@/components/Input';

import { RegisterSchemaType } from '../Register';

interface AddressSearchProps {
  control: Control<RegisterSchemaType>;
  errors: FieldError;
  validate?: (value: string) => boolean | string;
  onAddressChange: (address: string) => void;
}

const AddressSearch = (props: AddressSearchProps) => {
  const { control, errors, onAddressChange } = props;

  const [firstAddress, setFirstAddress] = useState<string>('');

  const wrapRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const foldDaumPostcode = () => {
    if (!wrapRef.current) return;

    wrapRef.current.style.display = 'none';
  };

  const execDaumPostcode = () => {
    const currentScroll = Math.max(document.body.scrollTop, document.documentElement.scrollTop);

    new window.daum.Postcode({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      oncomplete: (data: any) => {
        let addr = '';

        if (data.userSelectedType === 'R') {
          addr = data.roadAddress;
        } else {
          addr = data.jibunAddress;
        }

        if (wrapRef.current) {
          wrapRef.current.style.display = 'none';
        }

        document.body.scrollTop = currentScroll;

        onAddressChange(addr);
        setFirstAddress(addr);
      },

      onresize: (size: { height: number }) => {
        if (!wrapRef.current) return;

        wrapRef.current.style.height = `${size.height}px`;
      },
      width: '100%',
      height: '100%',
    }).embed(wrapRef.current);

    if (wrapRef.current) {
      wrapRef.current.style.display = 'block';
    }
  };

  return (
    <div>
      <div>
        <Input
          name="firstAddress"
          control={control}
          label="주소"
          type="text"
          error={errors}
          extractNumber={false}
          placeholder="주소를 검색해주세요."
          addon={{
            buttonText: '주소검색',
            color: '#000',
            onSubmit: () => searchRef.current?.click(),
          }}
          disabled={true}
          value={firstAddress}
        />
        <Input name="lastAddress" control={control} type="text" placeholder="상세주소 입력" extractNumber={false} />

        <input ref={searchRef} className="hidden" type="button" onClick={execDaumPostcode} value="주소검색" />
      </div>

      <div className="w-full h-80 relative border border-black my-1 hidden" ref={wrapRef}>
        <img
          src="//t1.daumcdn.net/postcode/resource/images/close.png"
          className="cursur-pointer absolute right-0 top-[-1px] z-10"
          onClick={foldDaumPostcode}
          alt="접기 버튼"
        />
      </div>
    </div>
  );
};

export default AddressSearch;
