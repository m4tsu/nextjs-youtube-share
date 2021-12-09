import { z } from 'zod';

import { schemaForType } from '@/lib/zod/schemaForType';

import { User } from './user';

import { Comment as PrismaComment, DeletedBy } from '.prisma/client';

type DeletedComment = Omit<PrismaComment, 'content' | 'deletedBy'> & {
  content: null;
  deletedBy: DeletedBy;
};
export type Comment = (
  | DeletedComment
  | (Omit<PrismaComment, 'deletedBy'> & { deletedBy: null })
) & {
  user: User;
};

export const commentSchema = schemaForType<PrismaComment>()(
  z.object({
    id: z.number(),
    userId: z.string().uuid(),
    postId: z.string().uuid(),
    content: z
      .string()
      .min(1, '本文を入力してください。')
      .max(1000, '1000文字以下で入力してください。'),
    createdAt: z.date(),
    deletedBy: z
      .union([z.literal('author'), z.literal('commenter')])
      .nullable(),
  })
);

export const commentSchemaOnCreate = commentSchema.pick({
  content: true,
});

export type NewCommentParams = z.infer<typeof commentSchemaOnCreate>;
