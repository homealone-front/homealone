import * as yup from 'yup';

// yup 스키마 정의
export const talkSchema = yup.object().shape({
  title: yup.string().required('혼잣말 제목을 입력해 주세요!'),
  content: yup.string().required('혼잣말 내용을 입력해 주세요!'),
  tags: yup.array().of(
    yup.object().shape({
      tagName: yup.string(), // Required 풀기
    }),
  ),
});
