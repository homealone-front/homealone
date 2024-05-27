import dayjs from 'dayjs';
import { RegisterSchemaType } from './Register';

/**
 * 회원가입 fetch 파라미터를 포맷팅한다.
 */
export const getRegisterDataCleansing = (data: RegisterSchemaType) => {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { firstAddress, lastAddress, birth, confirmPassword, ...rest } = data;

  return {
    ...rest,
    address: `${firstAddress} ${lastAddress}`.trim(),
    birth: dayjs(birth).format('YYYY-MM-DD'),
  };
};
