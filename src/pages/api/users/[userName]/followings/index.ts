import { z } from 'zod';

import { handler } from '@/lib/apiRouteHandler/handler';
import prisma from '@/lib/prisma/prismaClient';
import { User } from '@/types/domains/user';

const querySchema = z.object({
  userName: z.string(),
});
export default handler<User[]>().get(async (req, res) => {
  const { userName } = querySchema.parse(req.query);

  const result = await prisma.user.findMany({
    where: { followers: { some: { follower: { userName } } } },
    include: {
      followers: { where: { OR: [{ followerId: req.currentUser?.id }] } },
    },
  });
  const followings: User[] = result.map((followee) => ({
    ...followee,
    isFollowing: followee.followers.length > 0,
  }));
  return res.status(200).json(followings);
});
