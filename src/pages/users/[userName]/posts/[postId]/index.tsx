import { NextAppPage } from 'next';
import { useRouter } from 'next/router';
import { z } from 'zod';

import { UserPageLayout } from '@/components/layouts/UserPage/UserPageLayout';
import { PostPage } from '@/components/pages/[userName]/posts/[postId]/index/Post.page';

const querySchema = z.object({
  userName: z.string().optional(),
  postId: z.string().optional(),
});
const Page: NextAppPage = () => {
  const router = useRouter();
  const { userName, postId } = querySchema.parse(router.query);
  return <PostPage postId={postId} userName={userName} />;
};

Page.getLayout = (page) => <UserPageLayout>{page}</UserPageLayout>;
export default Page;
