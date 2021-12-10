import { z } from 'zod';

import { authenticate, handler } from '@/lib/apiRouteHandler/handler';
import prisma from '@/lib/prisma/prismaClient';

const querySchema = z.object({
  postId: z.string(),
});
export default handler()
  .get(async (req, res) => {
    const { postId } = querySchema.parse(req.query);
    const result = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        favorites: { include: { user: true } },
      },
    });
    if (!result) {
      return res.status(404).json({ message: '投稿が見つかりませんでした' });
    }
    const data = {
      ...result,
      favoriteUsers: result.favorites.map((f) => f.user),
    };
    return res.status(200).json(data);
  })
  .post(async (req, res) => {
    const { postId } = querySchema.parse(req.query);
    const currentUser = authenticate(req);

    const result = await prisma.favorite.create({
      data: { userId: currentUser.id, postId },
      include: { post: { include: { user: true } } },
    });

    try {
      await prisma.notification.create({
        data: {
          notifierId: currentUser.id,
          recieverId: result.post.userId,
          type: 'favorited',
          targetId: postId,
          targetName: result.post.title,
        },
      });
    } catch (e) {
      console.log(e); // TODO: とりあえずこっちはエラー投げないようにしておく...
    }

    return res.status(200).json(result);
  })
  .delete(async (req, res) => {
    const { postId } = querySchema.parse(req.query);
    const currentUser = authenticate(req);

    const result = await prisma.favorite.delete({
      where: {
        postId_userId: { userId: currentUser.id, postId },
      },
    });
    return res.status(200).json(result);
  });
