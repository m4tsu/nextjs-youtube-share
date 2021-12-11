import { z } from 'zod';

import { authenticate, handler } from '@/lib/apiRouteHandler/handler';
import prisma from '@/lib/prisma/prismaClient';

const querySchema = z.object({
  categoryId: z
    .string()
    .refine((v) => {
      return !isNaN(Number(v));
    }, 'limit: unexpected type')
    .transform((v) => Number(v)),
});
export default handler().delete(async (req, res) => {
  const currentUser = authenticate(req);
  const { categoryId } = querySchema.parse(req.query);
  const category = await prisma.category.findUnique({
    where: { id: categoryId },
  });
  if (!category) {
    return res.status(404).json({ message: 'カテゴリーが見つかりません。' });
  }
  if (currentUser.id !== category.userId) {
    return res.status(401).json({ message: '許可されていません。' });
  }
  const result = await prisma.category.delete({ where: { id: categoryId } });

  return res.status(200).json(result);
});
