import { authenticate, handler } from '@/lib/apiRouteHandler/handler';
import prisma from '@/lib/prisma/prismaClient';

export default handler<number>().get(async (req, res) => {
  const currentUser = authenticate(req);
  const count = await prisma.notification.count({
    where: { recieverId: currentUser.id, read: false },
  });
  return res.status(200).json(count);
});
