import { z } from 'zod';

import { handler } from '@/lib/apiRouteHandler/handler';
import prisma from '@/lib/prisma/prismaClient';
import { Category } from '@/types/domains/category';

const querySchema = z.object({ userName: z.string() });

export default handler<Category[]>().get(async (req, res) => {
  const { userName } = querySchema.parse(req.query);

  const categories = await prisma.category.findMany({
    where: { user: { userName } },
  });

  return res.status(200).json(categories);
});
