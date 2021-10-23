import { NextAppPage } from 'next';
import { useRouter } from 'next/router';
import { useUserPosts } from '@/repositories/posts';
import { Panel } from '@/components/common/Panel';
import { PostPanel } from '@/components/pages/users/posts/PostPanel';
import { UserPageLayout } from '@/components/layouts/UserPage/UserPageLayout';
import { NoResourceError } from '@/components/pages/error/NoResourceError';
import { Loading } from '@/components/common/Loading';

const VideosPage: NextAppPage = () => {
  const router = useRouter();
  const user_name = router.query.user_name as string;
  const { data, error } = useUserPosts(user_name);
  console.log(data);

  if (error) {
    console.log(error);
    return <NoResourceError resourceName="投稿" />;
  }
  if (!data) {
    return <Loading />;
  }
  return (
    <Panel display="flex" flexDirection="column" sx={{ gap: '2rem' }}>
      {data.posts.map((post) => (
        <PostPanel key={post.id} post={post} user={data} />
      ))}
    </Panel>
  );
};

VideosPage.getLayout = (page) => <UserPageLayout>{page}</UserPageLayout>;

export default VideosPage;
