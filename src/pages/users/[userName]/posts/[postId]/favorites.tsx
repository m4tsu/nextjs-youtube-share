import { NextAppPage } from 'next';
import { useRouter } from 'next/router';
import { z } from 'zod';

import { FavoritesPage } from '@/components/pages/[userName]/posts/[postId]/favorites/Favorites.page';
import { Loading } from '@/components/ui/Loading';
import { getPath } from '@/utils/route/Link';

const querySchema = z.object({
  userName: z.string().optional(),
  postId: z.string().optional(),
  asModal: z.string().optional(),
});
const Page: NextAppPage = () => {
  const router = useRouter();
  const { postId, userName, asModal } = querySchema.parse(router.query);
  if (!asModal) {
    if (postId && userName) {
      router.replace({
        pathname: getPath({
          path: '/users/[userName]/posts/[postId]',
          params: { userName, postId },
        }),
      });
    } else {
      return <Loading />;
    }
  }
  return <FavoritesPage postId={postId} />;
};

export default Page;
