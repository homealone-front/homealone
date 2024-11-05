import { isAxiosError } from 'axios';

export const getErrorMessage = (error: unknown): string => {
  if (isAxiosError(error)) {
    if (!error.response) {
      return '네트워크 에러입니다. 인터넷 연결을 확인해주세요.';
    }
    const { status, data } = error.response;
    if (status >= 400) {
      return data?.message || '알 수 없는 에러가 발생했습니다.';
    }
  }
  return '알 수 없는 에러가 발생했습니다.';
};
