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
  const result = await prisma.user.findUnique({
    where: { userName },
    include: {
      _count: { select: { posts: true } },
      posts: {
        take: perPage,
        skip,
        orderBy: { updatedAt: 'desc' },
        include: {
          _count: { select: { favorites: true } },
          favorites: { where: { userId: req.currentUser?.id } },
        },
      },
    },
  });
  console.log('userPosts', result);
  if (!result) {
    return res.status(404).json({
      message: 'ユーザーがみつかりませんでした.',
    });
  }
  const userPosts = {
    ...result,
    postsCount: result._count?.posts || 0,
    posts: result.posts.map((post) => ({
      ...post,
      favoritesCount: post._count?.favorites || 0,
      favorited: post.favorites.length > 0,
    })),
  };
  return res.status(200).json(userPosts);
});
