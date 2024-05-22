/**
 * 숫자만 필터링 한다.
 */
export const numberExtract = (value: string) => value.match(/\d*/g)?.filter(Boolean).join('');
