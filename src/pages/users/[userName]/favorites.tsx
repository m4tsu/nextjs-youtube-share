import { NextAppPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { z } from 'zod';

import { UserPageLayout } from '@/components/layouts/UserPage/UserPageLayout';
import { FavoritePostsPage } from '@/components/pages/[userName]/favorites/index/FavoritePosts.page';

const querySchema = z.object({
  userName: z.string().optional(),
  category: z.string().optional(),
  page: z
    .string()
    .optional()
    .refine((v) => {
      return v ? !isNaN(Number(v)) : true;
    }, 'limit: unexpected type')
    .transform((v) => (v ? Number(v) : undefined)),
});
const Page: NextAppPage = () => {
  const router = useRouter();
  const { userName, page, category } = querySchema.parse(router.query);

  return <FavoritePostsPage userName={userName} page={page ?? 1} />;
};

Page.getLayout = (page) => <UserPageLayout>{page}</UserPageLayout>;
export default Page;
