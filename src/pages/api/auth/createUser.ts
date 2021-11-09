import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

import { authenticate, handler } from '@/lib/apiRouteHandler/handler';
import prisma from '@/lib/prisma/prismaClient';
import { UserMetaData } from '@/types/domains/user';
import { User } from '@/types/domains/user';
import { ApiErrorObject } from '@/utils/types/error';

export default handler<User>().post(async (req, res) => {
  const currentUser = authenticate(req);
  const userByAuthUserId = await prisma.user.findUnique({
    where: { id: currentUser.id },
  });
  if (userByAuthUserId) {
    const error: ApiErrorObject = { message: '既にユーザーが存在しています' };
    return res.status(500).json(error);
  }
  const { id, user_metadata } = currentUser;
  const { avatar_url, full_name, user_name } = user_metadata as UserMetaData;
  try {
    // TODO: こんな感じでRLSかましたいけどSupabaseでfalse設定してても通っちゃう.user権限？
    // const [_, newUser] = await prisma.$transaction([
    //   prisma.$executeRaw`SET request.jwt.claim.sub="${id}";`,
    //   prisma.user.create({
    //     data: {
    //       id,
    //       userName: userName,
    //       displayName: full_name,
    //       avatarUrl: avatar_url,
    //     },
    //   }),
    // ]);

    // twitterIdをuserNameとしてpublic.userを作成する
    const newUser = await prisma.user.create({
      data: {
        id,
        userName: user_name,
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
      res.redirect(307, '/settings/registration');
    } else {
      return res.status(500).json({
        message: JSON.stringify(e),
        unexpected: true,
      });
    }
  }
});
PrismaClientKnownRequestError;
