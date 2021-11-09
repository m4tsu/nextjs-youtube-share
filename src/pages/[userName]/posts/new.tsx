import { NextAppPage } from 'next';
import { useRouter } from 'next/router';
import { z } from 'zod';

import { NewPage } from '@/components/pages/[userName]/posts/new/New.page';

const querySchema = z.object({ userName: z.string().optional() });
const Page: NextAppPage = () => {
  const { userName } = querySchema.parse(useRouter().query);
  if (!userName) return null;
  return <NewPage userName={userName} />;
};

Page.requireLogin = true;

export default Page;
