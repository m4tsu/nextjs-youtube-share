import { z } from 'zod';

import { handler } from '@/lib/apiRouteHandler/handler';
import prisma from '@/lib/prisma/prismaClient';
import { User } from '@/types/domains/user';

const querySchema = z.object({
  displayNameOrUserName: z.string().optional(),
});
export default handler<User[]>().get(async (req, res) => {
  const { displayNameOrUserName } = querySchema.parse(req.query);
  console.warn(req.url, displayNameOrUserName);
  const result = await prisma.user.findMany({
    where: {
      OR: [
        { userName: { contains: displayNameOrUserName, mode: 'insensitive' } },
        {
          displayName: { contains: displayNameOrUserName, mode: 'insensitive' },
        },
      ],
    },
  });

  return res.status(200).json(result);
});
