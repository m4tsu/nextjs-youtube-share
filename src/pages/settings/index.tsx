import { NextAppPage } from 'next';

const SettingsPage: NextAppPage = () => {
  return <div>Settings Page</div>;
};

SettingsPage.requireLogin = true;

export default SettingsPage;
