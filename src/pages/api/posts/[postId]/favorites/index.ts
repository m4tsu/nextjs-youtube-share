import { z } from 'zod';

import { authorize, handler } from '@/lib/apiRouteHandler/handler';
import prisma from '@/lib/prisma/prismaClient';

const querySchema = z.object({
  postId: z.string(),
});
export default handler()
  .post(async (req, res) => {
    const { postId } = querySchema.parse(req.query);
    const currentUser = authorize(req);

    const result = await prisma.favorite.create({
      data: { userId: currentUser.id, postId },
    });
    return res.status(200).json(result);
  })
  .delete(async (req, res) => {
    const { postId } = querySchema.parse(req.query);
    const currentUser = authorize(req);

    const result = await prisma.favorite.delete({
      where: {
        postId_userId: { userId: currentUser.id, postId },
      },
    });
    return res.status(200).json(result);
  });
