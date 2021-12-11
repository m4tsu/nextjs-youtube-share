import { authenticate, handler } from '@/lib/apiRouteHandler/handler';
import prisma from '@/lib/prisma/prismaClient';
import { User } from '@/types/domains/user';

export default handler<User>().get(async (req, res) => {
  const currentUser = authenticate(req);
  const userByAuthUserId = await prisma.user.findUnique({
    where: { id: currentUser.id },
  });
  if (!userByAuthUserId) {
    return res.status(404).json({ message: 'ユーザーが見つかりません' });
  }
  return res.status(200).json(userByAuthUserId);
});
