import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

import { authenticate, handler } from '@/lib/apiRouteHandler/handler';
import prisma from '@/lib/prisma/prismaClient';
import { UserMetaData } from '@/types/domains/user';
import { User } from '@/types/domains/user';

export default handler<User>().post(async (req, res) => {
  const currentUser = authenticate(req);
  const userByAuthUserId = await prisma.user.findUnique({
    where: { id: currentUser.id },
  });
  if (userByAuthUserId) {
    return res.status(500).json({ message: '既にユーザーが存在しています' });
  }
  const { id, user_metadata } = currentUser;
  const { avatar_url, full_name } = user_metadata as UserMetaData;
  const { userName } = req.body as { userName: string };
  try {
    const newUser = await prisma.user.create({
      data: {
        id,
        userName: userName,
        displayName: full_name,
        avatarUrl: avatar_url,
      },
    });
    return res.status(200).json(newUser);
  } catch (e) {
    // 既に同じuserNameのユーザーが登録されていた場合、特設ページで自分でuserName決めさせる
    if (
      e instanceof PrismaClientKnownRequestError &&
      e.message.indexOf(
        'Unique constraint failed on the fields: (`userName`)'
      ) > -1
    ) {
      res.status(307).json({ message: 'IDを設定する必要があります。' });
    } else {
      return res.status(500).json({
        message: JSON.stringify(e),
        unexpected: true,
      });
    }
  }
});
