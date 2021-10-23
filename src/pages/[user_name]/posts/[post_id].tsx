import { Loading } from '@/components/common/Loading';
import { UserPageLayout } from '@/components/layouts/UserPage/UserPageLayout';
import { NoResourceError } from '@/components/pages/error/NoResourceError';
import { PostPageComponent } from '@/components/pages/users/posts/PostPage';
import { usePost } from '@/repositories/posts';
import { NextAppPage } from 'next';
import { useRouter } from 'next/router';

const PostPage: NextAppPage = () => {
  const router = useRouter();
  const postId = router.query.post_id as string;
  const { data, error } = usePost(postId);
  if (error) return <NoResourceError resourceName="投稿" />;
  if (!data) return <Loading />;
  return <PostPageComponent post={data} />;
};

PostPage.getLayout = (page) => <UserPageLayout>{page}</UserPageLayout>;
export default PostPage;
