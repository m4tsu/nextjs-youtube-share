import { NextAppPage } from 'next';
import { useRouter } from 'next/router';
import { z } from 'zod';

import { FavoritesPage } from '@/components/pages/[userName]/posts/[postId]/favorites/Favorites.page';

const querySchema = z.object({
  userName: z.string().optional(),
  postId: z.string().optional(),
});
const Page: NextAppPage = () => {
  const { postId } = querySchema.parse(useRouter().query);

  return <FavoritesPage postId={postId} />;
};

export default Page;
