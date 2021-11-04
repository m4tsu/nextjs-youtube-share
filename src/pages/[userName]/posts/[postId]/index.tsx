import { NextAppPage } from 'next';
import { useRouter } from 'next/router';

import { UserPageLayout } from '@/components/layouts/UserPage/UserPageLayout';
import { PostPage } from '@/components/pages/[userName]/posts/[postId]/Post.page';

const Page: NextAppPage = () => {
  const router = useRouter();
  const { userName, postId } = router.query as {
    userName: string;
    postId: string;
  };
  // const { data, error } = usePost(userName, postId);
  // if (error) return <NoResourceError resourceName="投稿" />;
  // if (!data) return <Loading />;
  return <PostPage postId={postId} userName={userName} />;
};

Page.getLayout = (page) => <UserPageLayout>{page}</UserPageLayout>;
export default Page;
