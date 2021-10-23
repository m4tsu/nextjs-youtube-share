import { UserPageLayout } from '@/components/layouts/UserPage/UserPageLayout';
import { NextPage, NextPageWithLayout } from 'next';

const FavoritesPage: NextPageWithLayout = () => {
  return <div>FavoritesPage</div>;
};

FavoritesPage.getLayout = (page) => <UserPageLayout>{page}</UserPageLayout>;
export default FavoritesPage;
