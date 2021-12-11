import { authenticate, handler } from '@/lib/apiRouteHandler/handler';
import prisma from '@/lib/prisma/prismaClient';
import { postSchemaOnCreate } from '@/types/domains/post';
import { Post } from '@/types/domains/post';

export default handler<Post>().post(async (req, res) => {
  const currentUser = authenticate(req);
  const params = req.body;
  const validated = await postSchemaOnCreate.parse(params);

  // TODO: ここもうちょっと上手くやりたい
  const newCategories = validated.categories.filter(
    (category) => '__isNew__' in category
  ) as { value: string; label: string; __isNew__: true }[];
  const attachedCategories = validated.categories.filter(
    (category) => 'id' in category
  ) as { value: string; label: string; id: number }[];

  const newPost = await prisma.post.create({
    data: {
      ...validated,
      userId: currentUser.id,
      categories: {
        create: [
          ...attachedCategories.map((c) => {
            return {
              category: {
                connect: { id: c.id },
              },
            };
          }),
          ...newCategories.map((c) => {
            return {
              category: {
                create: {
                  userId: currentUser.id,
                  name: c.value,
                },
              },
            };
          }),
        ],
      },
    },
    include: { categories: { include: { category: true } } },
  });
  const post: Post = {
    ...newPost,
    categories: [...newPost.categories.map((c) => c.category)],
  };
  return res.status(200).json(post);
});
