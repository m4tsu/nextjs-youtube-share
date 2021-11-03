import { string, z } from 'zod';

import { schemaForType } from '@/lib/zod/schemaForType';
import { Post } from '@/types/domains/post';

import { User } from '.prisma/client';

export type UserMetaData = {
  avatar_url: string;
  full_name: string;
  user_name: string;
};

export type UserPosts = User & {
  posts: Post[];
  _count: { posts: number } | null;
};

export const userSchema = schemaForType<User>()(
  z.object({
    id: z.string().uuid(),
    userName: z
      .string()
      .min(1, 'tubetterIdは1文字以上である必要があります')
      .max(15, 'tubetterIDは15文字以下である必要があります')
      .regex(/^[A-Za-z0-9]*$/, 'tubetterIDは半角英数字のみ使用できます'),
    displayName: z.string().max(64),
    createdAt: z.date(),
    updatedAt: z.date(),
    avatarUrl: string(),
  })
);

export const userSchemaOnCreate = userSchema.pick({ userName: true });

export type { User };
