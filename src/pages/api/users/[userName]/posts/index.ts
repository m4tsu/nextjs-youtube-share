import { z } from 'zod';

import { handler } from '@/lib/apiRouteHandler/handler';
import prisma from '@/lib/prisma/prismaClient';
import { UserPosts } from '@/types/domains/user';

const querySchema = z.object({
  userName: z.string(),
  categoryName: z.string().optional(),
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
  const { userName, categoryName, pageIndex, perPage } = querySchema.parse(
    req.query
  );
  const skip = (pageIndex - 1) * perPage;
  const [totalCount, result] = await prisma.$transaction([
    prisma.post.count({
      where: {
        AND: [
          {
            categories: categoryName
              ? { some: { category: { name: categoryName } } }
              : undefined,
          },
          {
            user: { userName },
          },
        ],
      },
    }),
    prisma.user.findUnique({
      where: { userName },
      include: {
        posts: {
          take: perPage,
          skip,
          where: {
            AND: [
              {
                categories: categoryName
                  ? { some: { category: { name: categoryName } } }
                  : undefined,
              },
            ],
          },
          orderBy: { createdAt: 'desc' },
          include: {
            _count: { select: { favorites: true } },
            favorites: { where: { userId: req.currentUser?.id } },
            categories: { include: { category: true } },
          },
        },
      },
    }),
  ]);
  if (!result) {
    return res.status(404).json({
      message: '投稿が見つかりませんでした',
    });
  }
  const userPosts = {
    ...result,
    postsCount: totalCount,
    posts: result.posts.map((post) => ({
      ...post,
      favoritesCount: post._count?.favorites || 0,
      favorited: post.favorites.length > 0,
      categories: post.categories.map((c) => c.category),
    })),
  };
  return res.status(200).json(userPosts);
});
