import * as yup from 'yup';

// yup 스키마 정의
export const roomSchema = yup.object().shape({
  title: yup.string().required('방자랑 제목을 입력해 주세요!'),
  content: yup.string().required('방자랑 내용을 입력해 주세요!'),
  thumbnailUrl: yup.array().of(
    yup.object().shape({
      image: yup
        .mixed()
        .required('대표이미지를 선택해 주세요!')
        .test('is-file', '대표이미지는 파일이어야 합니다!', (value) => value instanceof File),

      imageUrl: yup.string().required('대표이미지를 선택해 주세요!'),
    }),
  ),
  roomImages: yup.array().of(
    yup.object().shape({
      image: yup.mixed(), // Required 풀기
      imageUrl: yup.string(), // Required 풀기
    }),
  ),
  tags: yup.array().of(
    yup.object().shape({
      tagName: yup.string(), // Required 풀기
    }),
  ),
});
