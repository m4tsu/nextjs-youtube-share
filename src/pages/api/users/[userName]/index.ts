import { handler } from '@/lib/apiRouteHandler/handler';
import prisma from '@/lib/prisma/prismaClient';
import { User } from '@/types/domains/user';

export default handler<User>().get(async (req, res) => {
  const { userName } = req.query as { userName: string };
  const currentUser = req.currentUser;
  console.log('user api!!!!', req.query);

  const user = await prisma.user.findUnique({
    where: { userName },
    include: { followers: { where: { followerId: currentUser?.id } } },
  });
  if (!user) {
    return res.status(404).json({
      message: 'ユーザーが見つかりませんでした',
    });
  }
  // 自分がフォローされている
  if (user.followers.length) {
    return res.status(200).json({ ...user, isFollowing: true });
  }
  return res.status(200).json(user);
});
