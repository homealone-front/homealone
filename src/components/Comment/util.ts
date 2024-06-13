import dayjs from 'dayjs';

export const getRelativeTime = (dateString: string) => {
  // 한국 시간대(KST)로 변환
  const givenDate = dayjs.tz(dateString, 'Asia/Seoul');
  const now = dayjs().tz('Asia/Seoul').subtract(9, 'hour');

  dayjs.locale('ko', {
    relativeTime: {
      future: '%s 전',
      past: '%s',
      s: '방금 전',
      m: '1분 전',
      mm: '%d분 전',
      h: '1시간 전',
      hh: '%d시간 전',
      d: '1일 전',
      dd: '%d일 전',
      M: '1달 전',
      MM: '%d달 전',
      y: '1년 전',
      yy: '%d년 전',
    },
  });

  return givenDate.from(now);
};
