import { handler } from '@/lib/apiRouteHandler/handler';
import prisma from '@/lib/prisma/prismaClient';
import { User } from '@/types/domains/user';

export default handler<User>().get(async (req, res) => {
  const { userName } = req.query as { userName: string };
  console.log('user api!!!!', req.query);
  const user = await prisma.user.findUnique({ where: { userName } });
  if (!user) {
    return res.status(404).json({
      message: 'ユーザーが見つかりませんでした',
    });
  }
  return res.status(200).json(user);
});
