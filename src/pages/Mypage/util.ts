import dayjs from 'dayjs';

/**
 * 회원정보(생년월일)의 초기값을 포맷팅한다.
 */
export const formatBirthDate = (birth: string) => {
  return dayjs(birth).format('YYYYMMDD');
};
