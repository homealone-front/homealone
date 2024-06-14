import { CustomSelectPropsType } from '@/components/Select/Select';

export type CategoryType = '전체' | '제목' | '내용' | '작성자';

export const CATEGORY_OPTIONS: PropType<CustomSelectPropsType, 'options'> = [
  {
    value: 'all',
    item: '전체',
  },
  {
    value: 'title',
    item: '제목',
  },
  {
    value: 'content',
    item: '내용',
  },
  {
    value: 'memberName',
    item: '작성자',
  },
];

export const RECIPE_CATEGORY_OPTIONS: PropType<CustomSelectPropsType, 'options'> = [
  {
    value: 'all',
    item: '전체',
  },
  {
    value: 'title',
    item: '제목',
  },
  {
    value: 'description',
    item: '내용',
  },
  {
    value: 'userName',
    item: '작성자',
  },
];
