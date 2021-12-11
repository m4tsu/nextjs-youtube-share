import { NextAppPage } from 'next';

import { SettingsPage } from '@/components/pages/settings/index/Settings.page';

const Page: NextAppPage = () => {
  return <SettingsPage />;
};

Page.requireLogin = true;

export default Page;
