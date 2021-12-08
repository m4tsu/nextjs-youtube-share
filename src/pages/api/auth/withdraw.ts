import { authenticate, handler } from '@/lib/apiRouteHandler/handler';
import prisma from '@/lib/prisma/prismaClient';
import { supabaseClient } from '@/lib/supabase/client';
import { User } from '@/types/domains/user';

const serviceKey = process.env.SB_SERVICE_ROLE_KEY;
if (!serviceKey) {
  throw new Error('ServiceKey needed!');
}
export default handler<User>().delete(async (req, res) => {
  const currentUser = authenticate(req);

  const result = await prisma.user.delete({ where: { id: currentUser.id } });
  const hoge = await supabaseClient.auth.api.deleteUser(
    currentUser.id,
    serviceKey
  );
  console.log(serviceKey, hoge);
  res.status(200).json(result);
});
