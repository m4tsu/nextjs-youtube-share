import { z } from 'zod';

import { handler } from '@/lib/apiRouteHandler/handler';
import prisma from '@/lib/prisma/prismaClient';
import { Post } from '@/types/domains/post';
import { User } from '@/types/domains/user';

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

export type UserFavoritePosts = {
  posts: (Post & {
    favoritesCount: number;
    user: User;
    favorited?: boolean;
  })[];
  postsCount: number;
};
export default handler<UserFavoritePosts>().get(async (req, res) => {
  const { userName, pageIndex, perPage } = querySchema.parse(req.query);
  const skip = (pageIndex - 1) * perPage;
  const [totalCount, data] = await prisma.$transaction([
    prisma.post.count({
      where: {
        AND: [{ favorites: { some: { user: { userName } } } }],
      },
    }),

    prisma.post.findMany({
      where: {
        AND: [{ favorites: { some: { user: { userName } } } }],
      },
      include: {
        user: true,
        favorites: { where: { userId: req.currentUser?.id } },
        _count: { select: { favorites: true } },
      },
      take: perPage,
      skip,
      orderBy: { createdAt: 'desc' }, // favoriteのupdatedAtでソートしたいけどできなさそう
    }),
  ]);
  if (!data) {
    return res.status(404).json({
      message: 'ユーザーが見つかりませんでした',
    });
  }
  const responseData: UserFavoritePosts = {
    ...data,
    posts: data.map((post) => {
      return {
        ...post,
        favoritesCount: post._count?.favorites || 0,
        user: post.user,
        favorited: post.favorites.length > 0,
      };
    }),
    postsCount: totalCount,
  };
  return res.status(200).json(responseData);
});
