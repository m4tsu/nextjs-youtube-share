import { NextAppPage } from 'next';
import { useRouter } from 'next/router';
import { z } from 'zod';

import { CategoryPage } from '@/components/pages/[userName]/categories/index/Categories.page';

const querySchema = z.object({
  userName: z.string().optional(),
  categoryName: z.string().optional(),
});
const Page: NextAppPage = () => {
  const router = useRouter();
  const { userName, categoryName } = querySchema.parse(router.query);

  return <CategoryPage userName={userName} categoryName={categoryName} />;
};

export default Page;
