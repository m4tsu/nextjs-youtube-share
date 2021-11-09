import { z } from 'zod';

import { authenticate, handler } from '@/lib/apiRouteHandler/handler';
import prisma from '@/lib/prisma/prismaClient';

const querySchema = z.object({
  userId: z.string(),
});
export default handler()
  .post(async (req, res) => {
    const currentUser = authenticate(req);
    const { userId } = querySchema.parse(req.query);

    // const result = await prisma.follow.create({
    //   data: { followerId: currentUser.id, followeeId: userId },
    // });
    const result = await prisma.user.update({
      where: { id: currentUser.id },
      data: { followings: { create: [{ followeeId: userId }] } },
    });
    res.status(200).json(result);
  })
  .delete(async (req, res) => {
    const currentUser = authenticate(req);
    const { userId } = querySchema.parse(req.query);

    const result = await prisma.follow.delete({
      where: {
        followeeId_followerId: {
          followerId: currentUser.id,
          followeeId: userId,
        },
      },
    });
    res.status(200).json(result);
    // const result = await prisma.user.update({where: {id: currentUser.id}, data: {followings: {delete: [{followeeId_followerId: {}}]}}})
  });
