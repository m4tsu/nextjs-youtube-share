import { z } from 'zod';

import { authenticate, handler } from '@/lib/apiRouteHandler/handler';
import prisma from '@/lib/prisma/prismaClient';
import { Comment } from '@/types/domains/comment';

const querySchema = z.object({
  postId: z.string(),
  commentId: z
    .string()
    .refine((v) => {
      return !isNaN(Number(v));
    }, 'limit: unexpected type')
    .transform((v) => Number(v)),
});
export default handler<Comment>().delete(async (req, res) => {
  const currentUser = authenticate(req);
  const { postId, commentId } = querySchema.parse(req.query);
  const comment = await prisma.comment.findUnique({
    where: { id: commentId },
    include: { post: true },
  });
  if (!comment)
    return res.status(404).json({ message: 'コメントが見つかりません。' });
  if (currentUser.id === comment.post.userId) {
    const result = await prisma.comment.update({
      where: { id: commentId },
      data: { deletedBy: 'author' },
      include: { user: true },
    });
    return res
      .status(200)
      .json({ ...result, deletedBy: 'author', content: null });
  }
  if (currentUser.id === comment.userId) {
    const result = await prisma.comment.update({
      where: { id: commentId },
      data: { deletedBy: 'commenter' },
      include: { user: true },
    });
    return res
      .status(200)
      .json({ ...result, deletedBy: 'commenter', content: null });
  }

  return res.status(401).json({ message: '許可されていません。' });
});
