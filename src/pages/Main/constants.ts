import { CustomSelectPropsType } from '@/components/Select/Select';

export type CategoryType = '전체' | '레시피' | '방자랑' | '혼잣말';

export const CATEGORY_OPTIONS: PropType<CustomSelectPropsType, 'options'> = [
  {
    value: '전체',
    item: '전체',
  },
  {
    value: '레시피',
    item: '레시피',
  },
  {
    value: '방자랑',
    item: '방자랑',
  },
  {
    value: '혼잣말',
    item: '혼잣말',
  },
];
