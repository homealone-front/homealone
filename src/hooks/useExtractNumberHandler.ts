import { ChangeEventHandler } from 'react';
import { numberExtract } from '@/utils/numberExtractor';

/**
 * 숫자만 입력할 수 있게 한다.
 */
export const useExtractNumberHandler =
  <T extends HTMLInputElement | HTMLTextAreaElement>(): ChangeEventHandler<T> =>
  (e) => {
    const value = e.currentTarget.value;

    const onlyNumber = numberExtract(value);

    e.currentTarget.value = onlyNumber ?? '';
  };
