import { NextAppPage } from 'next';
import { useRouter } from 'next/router';
import { z } from 'zod';

import { UserPageLayout } from '@/components/layouts/UserPage/UserPageLayout';
import { FollowersPage } from '@/components/pages/[userName]/followers/index/Followers.page';

const querySchema = z.object({ userName: z.string().optional() });
const Page: NextAppPage = () => {
  const router = useRouter();
  const { userName } = querySchema.parse(router.query);
  return <FollowersPage userName={userName} />;
};

Page.getLayout = (page) => <UserPageLayout>{page}</UserPageLayout>;
export default Page;
