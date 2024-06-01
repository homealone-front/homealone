import { Appbar } from '@/components/Appbar';
import { Layout } from '@/layout';
import { Comment } from '@/components/Comment';
import { CommentForm } from '@/components/CommentForm';

/**
 * 혼잣말 게시글 상세페이지
 */
const TalkDetail = () => {
  return (
    <>
      <Appbar />
      <Layout>
        <div>혼잣말 상세 컨텐츠 영역</div>
        <CommentForm />
        {Array.from({ length: 14 }).map((_, index) => (
          <Comment key={index} />
        ))}
      </Layout>
    </>
  );
};

export default TalkDetail;
