import { CustomSelectPropsType } from '@/components/Select/Select';

export type CategoryType = '전체' | '제목' | '내용' | '작성자';

export const CATEGORY_OPTIONS: PropType<CustomSelectPropsType, 'options'> = [
  {
    value: '전체',
    item: '전체',
  },
  {
    value: '제목',
    item: '제목',
  },
  {
    value: '내용',
    item: '내용',
  },
  {
    value: '작성자',
    item: '작성자',
  },
];
