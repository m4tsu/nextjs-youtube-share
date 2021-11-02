import { NextAppPage } from 'next';
import { useRouter } from 'next/router';

import { UserPageLayout } from '@/components/layouts/UserPage/UserPageLayout';
import { PostsPage } from '@/components/pages/[userName]/Index/Posts.page';

const Page: NextAppPage = () => {
  const router = useRouter();
  const userName = router.query.userName as string;

  return <PostsPage userName={userName} />;
};

Page.getLayout = (page) => <UserPageLayout>{page}</UserPageLayout>;

export default Page;
