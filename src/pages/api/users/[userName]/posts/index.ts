import { z } from 'zod';

import { handler } from '@/lib/apiRouteHandler/handler';
import prisma from '@/lib/prisma/prismaClient';
import { UserPosts } from '@/types/domains/user';

const querySchema = z.object({
  userName: z.string(),
  pageIndex: z
    .string()
    .refine((v) => {
      return !isNaN(Number(v));
    }, 'limit: unexpected type')
    .transform((v) => Number(v)),
  perPage: z
    .string()
    .refine((v) => {
      return !isNaN(Number(v));
    }, 'limit: unexpected type')
    .transform((v) => Number(v)),
});

export default handler<UserPosts>().get(async (req, res) => {
  console.log(req.url);
  const { userName, pageIndex, perPage } = querySchema.parse(req.query);
  console.log('userPosts api', req.query);
  const skip = (pageIndex - 1) * perPage;
  const userPosts = await prisma.user.findUnique({
    where: { userName },
    include: {
      _count: { select: { posts: true } },
      posts: { take: perPage, skip, orderBy: { updatedAt: 'desc' } },
    },
  });
  console.log('userPosts', userPosts);
  if (!userPosts) {
    return res.status(404).json({
      message: '投稿がみつかりませんでした.',
    });
  }
  return res.status(200).json(userPosts);
});
