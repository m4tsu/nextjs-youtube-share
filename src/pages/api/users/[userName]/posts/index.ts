import { handler } from '@/lib/apiRouteHandler/handler';
import prisma from '@/lib/prisma/prismaClient';
import { Post } from '@/types/domains/post';
import { User } from '@/types/domains/user';

export default handler<User & { posts: Post[] }>().get(async (req, res) => {
  const { userName } = req.query as { userName: string };
  console.log('userPosts api', req.query);
  const userPosts = await prisma.user.findUnique({
    where: { userName },
    include: { posts: { orderBy: { updatedAt: 'desc' } } },
  });
  console.log('userPosts', userPosts);
  if (!userPosts) {
    return res.status(404).json({
      message: '投稿がみつかりませんでした.',
    });
  }
  return res.status(200).json(userPosts);
});
