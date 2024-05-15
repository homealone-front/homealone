type PropType<T, K extends keyof T> = T[K];
type ArrayType<P extends Array> = P extends Array<infer T> ? T : unknown;

/**
 * 빈 문자열 리터럴 타입 추가
 */
type WithEmptyString<T> = {
  [K in keyof T]: T[K] extends object ? WithEmptyString<T[K]> : T[K] | '';
};
