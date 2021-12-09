import { NextAppPage } from 'next';

import { CategorySettingsPage } from '@/components/pages/settings/category/index/CategorySettings.page';

const Page: NextAppPage = () => {
  return <CategorySettingsPage />;
};

Page.requireLogin = true;
export default Page;
