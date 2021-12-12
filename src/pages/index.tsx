import { NextAppPage } from 'next';

import { TopPage } from '@/components/pages/top/Top.page';

// SSRしてみたけど遅いから一回消す
// type Props = {
//   posts: PostWithUser[];
// };
// export const getServerSideProps: GetServerSideProps<Props> = async () => {
//   try {
//     const data = await httpClient.get<PostWithUser[]>(
//       `${SERVER_URL}${ApiPaths.posts}?limit=3`
//     );
//     return {
//       props: { posts: data },
//     };
//   } catch (e) {
//     Sentry.captureException(e);
//     return {
//       props: { posts: [] },
//     };
//   }
// };

export const Page: NextAppPage = () => {
  return <TopPage />;
};
export default Page;
