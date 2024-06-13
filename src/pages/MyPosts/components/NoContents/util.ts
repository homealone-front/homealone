/**
 * 인자로 받은 한글의 종성여부를 판단하여 적합한 조사를 리턴한다.
 */
export const getKoreanAffix = (str: string) => {
  const lastChar = str.charCodeAt(str.length - 1);
  const hasLast = (lastChar - 0xac00) % 28;

  return hasLast ? '이' : '가';
};
