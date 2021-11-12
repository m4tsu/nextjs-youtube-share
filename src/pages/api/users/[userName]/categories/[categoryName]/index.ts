import { z } from 'zod';

import { handler } from '@/lib/apiRouteHandler/handler';
import prisma from '@/lib/prisma/prismaClient';
import { Post } from '@/types/domains/post';

const querySchema = z.object({
  userName: z.string(),
  categoryName: z.string(),
});

export default handler<Post[]>().get(async (req, res) => {
  const { userName, categoryName } = querySchema.parse(req.query);

  const categories = await prisma.post.findMany({
    where: { user: { userName } },
  });

  return res.status(200).json(categories);
});
