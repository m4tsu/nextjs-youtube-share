import { handler } from '@/lib/apiRouteHandler/handler';
import prisma from '@/lib/prisma/prismaClient';
import { Post } from '@/types/domains/post';

export default handler<Post>().get(async (req, res) => {
  const { postId } = req.query as { userName: string; postId: string };
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
});
