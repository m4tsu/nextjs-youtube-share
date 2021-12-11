import { NextAppPage } from 'next';

import { UserPageLayout } from '@/components/layouts/UserPage/UserPageLayout';
import { HomePage } from '@/components/pages/home/index/Home.page';

const Page: NextAppPage = () => {
  return <HomePage />;
};

Page.requireLogin = true;
Page.getLayout = (page) => <UserPageLayout>{page}</UserPageLayout>;

export default Page;
