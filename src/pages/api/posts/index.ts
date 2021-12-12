import { z } from 'zod';

import { handler } from '@/lib/apiRouteHandler/handler';
import prisma from '@/lib/prisma/prismaClient';
import { PostWithUser } from '@/types/domains/post';

const querySchema = z.object({
  cursor: z.string().optional(),
  limit: z
    .string()
    .refine((v) => {
      return !isNaN(Number(v));
    }, 'limit: unexpected type')
    .transform((v) => Number(v)),
});

export default handler<PostWithUser[]>().get(async (req, res) => {
  const { cursor, limit } = querySchema.parse(req.query);
  const currentUser = req.currentUser;
  if (cursor) {
    const posts = await prisma.post.findMany({
      take: limit,
      skip: 1, // Skip the cursor
      cursor: {
        id: cursor,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        _count: { select: { favorites: true } },
        favorites: { where: { userId: currentUser?.id } },
        user: true,
      },
    });
    return res.status(200).json(
      posts.map((post) => ({
        ...post,
        favoritesCount: post._count?.favorites || 0,
        favorited: post.favorites.length > 0,
      }))
    );
  }
  const posts = await prisma.post.findMany({
    take: limit,
    orderBy: { createdAt: 'desc' },
    include: {
      _count: { select: { favorites: true } },
      favorites: { where: { userId: currentUser?.id } },
      user: true,
    },
  });
  return res.status(200).json(
    posts.map((post) => ({
      ...post,
      favoritesCount: post._count?.favorites || 0,
      favorited: post.favorites.length > 0,
    }))
  );
});
