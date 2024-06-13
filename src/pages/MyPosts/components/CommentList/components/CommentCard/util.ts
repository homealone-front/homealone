import dayjs from 'dayjs';

import { generatePath } from 'react-router-dom';

/**
 * 한국 시간대(KST)로 변환
 * */
export const getKoreanDate = (dateString: string) => {
  const givenDate = dayjs.utc(dateString).tz('Asia/Seoul');
  return givenDate.format('YYYY-MM-DD HH:mm');
};

/**
 * 게시글 주소 반환
 * */
export const getPostPath = (postType: string, postId: number) => {
  const path = postType.toLowerCase();

  return generatePath(`/${path}/:id`, {
    id: postId.toString(),
  });
};
