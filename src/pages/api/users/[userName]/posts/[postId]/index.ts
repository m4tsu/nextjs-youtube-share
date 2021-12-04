import { ApiError } from 'next/dist/server/api-utils';
import { z } from 'zod';

import { authenticate, handler } from '@/lib/apiRouteHandler/handler';
import prisma from '@/lib/prisma/prismaClient';
import { Post, postSchemaOnUpdate } from '@/types/domains/post';

const querySchema = z.object({ postId: z.string(), userName: z.string() });
export default handler<Post>()
  .get(async (req, res) => {
    const { postId } = querySchema.parse(req.query);
    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: {
        _count: { select: { favorites: true } },
        favorites: { where: { userId: req.currentUser?.id } },
        categories: { include: { category: true } },
      },
    });
    if (!post) {
      return res.status(404).json({
        message: '投稿がみつかりませんでした.',
      });
    }
    return res.status(200).json({
      ...post,
      favoritesCount: post._count?.favorites || 0,
      favorited: post.favorites.length > 0,
      categories: post.categories.map((c) => c.category),
    });
  })
  .patch(async (req, res) => {
    const { postId } = querySchema.parse(req.query);

    const currentUser = authenticate(req);

    // TODO: authorizeいいやり方わからん
    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: { user: true },
    });
    if (!post) {
      throw new ApiError(404, '投稿が見つかりません.');
    }
    if (post.userId !== currentUser.id) {
      throw new ApiError(401, '許可されていません.');
    }

    const params = req.body;
    const {
      title,
      body,
      categories: categorieOptions,
    } = await postSchemaOnUpdate.parse(params);

    // TODO: ここもうちょっと上手くやりたい
    const newCategories = categorieOptions.filter(
      (category) => '__isNew__' in category
    ) as { value: string; label: string; __isNew__: true }[];
    const attachedCategories = categorieOptions.filter(
      (category) => 'id' in category
    ) as { value: string; label: string; id: number }[];

    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: {
        title,
        body,
        // userId: currentUser.id,
        categories: {
          deleteMany: {}, // どれが追加でどれが削除されたかわからないので全部消してから作り直す。微妙だけど https://github.com/prisma/prisma/issues/5456
          create: [
            ...attachedCategories.map((c) => {
              return {
                category: {
                  connect: { id: c.id },
                },
              };
            }),
            ...newCategories.map((c) => {
              return {
                category: {
                  create: {
                    userId: currentUser.id,
                    name: c.value,
                  },
                },
              };
            }),
          ],
        },
      },
      include: { categories: { include: { category: true } } },
    });
    const resData: Post = {
      ...updatedPost,
      categories: [...updatedPost.categories.map((c) => c.category)],
    };
    return res.status(200).json(resData);
  })
  .delete(async (req, res) => {
    const { postId } = querySchema.parse(req.query);
    const currentUser = authenticate(req);

    // TODO: authorizeいいやり方わからん
    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: { user: true },
    });
    if (!post) {
      throw new ApiError(404, '投稿が見つかりません.');
    }
    if (post.userId !== currentUser.id) {
      throw new ApiError(401, '許可されていません.');
    }
    const deletedPost = await prisma.post.delete({
      where: { id: post.id },
    });
    return res.status(200).json(deletedPost);
  });
