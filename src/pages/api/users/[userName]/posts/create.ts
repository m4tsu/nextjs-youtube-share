import { authorize, handler } from '@/lib/apiRouteHandler/handler';
import prisma from '@/lib/prisma/prismaClient';
import { postSchemaOnCreate } from '@/types/domains/post';
import { Post } from '@/types/domains/post';

export default handler<Post>().post(async (req, res) => {
  const currentUser = authorize(req);
  const params = req.body;
  console.log(params);
  const validated = await postSchemaOnCreate.parse(params);
  console.log('createPost api', req.query);
  const newPost = await prisma.post.create({
    data: { ...validated, userId: currentUser.id },
  });

  return res.status(200).json(newPost);
});
