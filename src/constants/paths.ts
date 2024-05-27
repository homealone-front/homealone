/**
 * route path
 */
export const PATH = Object.freeze({
  /**
   * main
   */
  root: '/' as const,

  /**
   * 로그인
   */
  login: '/login' as const,

  /**
   * 회원가입
   */
  register: '/register' as const,
});

export type PathValue = ValueOf<typeof PATH>;
