import { z } from 'zod';

import { handler } from '@/lib/apiRouteHandler/handler';
import prisma from '@/lib/prisma/prismaClient';
import { Post } from '@/types/domains/post';

const querySchema = z.object({
  cursor: z.string().optional(),
  limit: z
    .string()
    .refine((v) => {
      return !isNaN(Number(v));
    }, 'limit: unexpected type')
    .transform((v) => Number(v)),
});

export default handler<Post[]>().get(async (req, res) => {
  // const {cursor, limit} = req.query as {cursor: Post['id'], limit: string}
  const { cursor, limit } = querySchema.parse(req.query);
  console.log('hogehoge', cursor, limit);
  if (cursor) {
    const posts = await prisma.post.findMany({
      take: limit,
      skip: 1, // Skip the cursor
      cursor: {
        id: cursor,
      },

      orderBy: {
        updatedAt: 'desc',
      },
    });
    console.log('posts', posts);
    return res.status(200).json(posts);
  }
  const posts = await prisma.post.findMany({
    take: limit,
    orderBy: { updatedAt: 'desc' },
  });
  console.log('posts', posts);
  return res.status(200).json(posts);
});
