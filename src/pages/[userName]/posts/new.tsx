import { NextAppPage } from 'next';

import { NewPage } from '@/components/pages/[userName]/posts/new/New.page';

const Page: NextAppPage = () => {
  return <NewPage />;
};

Page.requireLogin = true;

export default Page;
