import { z } from 'zod';

import { authenticate, handler } from '@/lib/apiRouteHandler/handler';
import prisma from '@/lib/prisma/prismaClient';
import { Notification } from '@/types/domains/notification';

const querySchema = z.object({
  cursor: z
    .string()
    .refine((v) => {
      return !isNaN(Number(v));
    }, 'limit: unexpected type')
    .transform((v) => Number(v))
    .optional(),
  limit: z
    .string()
    .refine((v) => {
      return !isNaN(Number(v));
    }, 'limit: unexpected type')
    .transform((v) => Number(v)),
});

export default handler<Notification[]>()
  .get(async (req, res) => {
    const currentUser = authenticate(req);
    const { cursor, limit } = querySchema.parse(req.query);
    if (cursor) {
      const notifications = await prisma.notification.findMany({
        take: limit,
        skip: 1,
        where: { recieverId: currentUser.id },
        cursor: { id: cursor },
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          notifier: true,
        },
      });
      return res.status(200).json(notifications);
    }
    const notifications = await prisma.notification.findMany({
      take: limit,
      where: { recieverId: currentUser.id },
      orderBy: { createdAt: 'desc' },
      include: {
        notifier: true,
      },
    });
    return res.status(200).json(notifications);
  })
  .patch(async (req, res) => {
    const currentUser = authenticate(req);
    await prisma.notification.updateMany({
      where: { recieverId: currentUser.id, read: false },
      data: { read: true },
    });
    return res.status(200).json([]);
  });
