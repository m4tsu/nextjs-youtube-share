import { NextAppPage } from 'next';

import { WithdrawPage } from '@/components/pages/withdraw/index/Withdraw.page';

const Page: NextAppPage = () => {
  return <WithdrawPage />;
};
Page.requireLogin = true;
export default Page;
