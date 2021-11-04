import { handler } from '@/lib/apiRouteHandler/handler';
import prisma from '@/lib/prisma/prismaClient';
import { Post } from '@/types/domains/post';

export default handler<Post>().get(async (req, res) => {
  const { postId } = req.query as { userName: string; postId: string };
  console.log('post api', req.query);
  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: {
      _count: { select: { favorites: true } },
      favorites: { where: { userId: req.currentUser?.id } },
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
  });
});
