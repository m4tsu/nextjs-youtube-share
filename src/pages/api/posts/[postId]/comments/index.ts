import { z } from 'zod';

import { authenticate, handler } from '@/lib/apiRouteHandler/handler';
import prisma from '@/lib/prisma/prismaClient';
import { Comment, commentSchemaOnCreate } from '@/types/domains/comment';

const querySchema = z.object({ postId: z.string() });
export default handler<Comment>().post(async (req, res) => {
  const currentUser = authenticate(req);
  const { postId } = querySchema.parse(req.query);
  const { content } = await commentSchemaOnCreate.parse(req.body);
  const comment = await prisma.comment.create({
    data: { userId: currentUser.id, postId, content },
    include: { user: true, post: true },
  });
  try {
    await prisma.notification.create({
      data: {
        notifierId: currentUser.id,
        recieverId: comment.post.userId,
        type: 'commented',
        targetId: postId,
        targetName: comment.post.title,
      },
    });
  } catch (e) {
    console.log(e); // TODO: とりあえずこっちはエラー投げないようにしておく...
  }

  return res.status(200).json({ ...comment, deletedBy: null });
});
