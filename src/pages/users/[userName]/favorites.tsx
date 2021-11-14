import { NextAppPage } from 'next';

import { UserPageLayout } from '@/components/layouts/UserPage/UserPageLayout';

const Page: NextAppPage = () => {
  return <div>FavoritesPage</div>;
};

Page.getLayout = (page) => <UserPageLayout>{page}</UserPageLayout>;
export default Page;
