import { z } from 'zod';

import { schemaForType } from '@/lib/zod/schemaForType';
import { validateUrl } from '@/utils/domains/post/video';

import { Category, categorySchemaOnPostForm } from './category';
import { User } from './user';

import { Post as PrismaPost, VideoType } from '.prisma/client';

type Post = PrismaPost & {
  favorited?: boolean;
  favoritesCount?: number;
  categories?: Category[];
};
export type { Post, VideoType };

export type PostFavorites = Post & {
  favoriteUsers: User[];
};

export type PostWithUser = Post & {
  user: User;
};

export type NicovideoInfo = {
  thumbnailUrl: string;
  title: string;
};

export const postSchema = schemaForType<PrismaPost>()(
  z.object({
    id: z.string().uuid(),
    userId: z.string().uuid(),
    videoId: z
      .string()
      .min(1, '動画のURLが不正です.')
      .max(255, '動画のURLが不正です.'),
    title: z
      .string()
      .min(1, 'タイトルを入力してください.')
      .max(255, 'タイトルは200文字以下で入力してください.'),
    body: z
      .string()
      .max(10000, '本文は10000文字以下で入力してください.')
      .nullable(),
    thumbnailUrl: z.string().nullable(),
    type: z.union([z.literal('youtube'), z.literal('nicovideo')]),
    createdAt: z.date(),
    updatedAt: z.date(),
  })
);

export const postSchemaOnCreate = postSchema
  .pick({
    type: true,
    videoId: true,
    title: true,
    body: true,
    thumbnailUrl: true,
  })
  .extend({
    thumbnailUrl: z.string().optional(),
    categories: z.array(categorySchemaOnPostForm),
  });

export const postFormSchemaOnCreate = postSchemaOnCreate
  .pick({ type: true, title: true, body: true, thumbnailUrl: true })
  .extend({
    videoUrl: z.string().min(1, 'URLを入力してください.'),
    categories: z
      .array(categorySchemaOnPostForm)
      // .array()
      .max(5, 'カテゴリーは5つまでしか設定できません.'),
  })
  .refine(
    (data) => {
      const result = validateUrl(data.type, data.videoUrl);
      return result.isValid;
    },
    { message: 'URLの形式が間違っています.', path: ['videoUrl'] }
  );
export type NewPostParams = z.infer<typeof postSchemaOnCreate>;
export type PostFormParamsOnCreate = z.infer<typeof postFormSchemaOnCreate>;

export const postSchemaOnUpdate = postSchema
  .pick({
    title: true,
    body: true,
  })
  .extend({
    categories: z.array(categorySchemaOnPostForm),
  });
export const postFormSchemaOnUpdate = postSchemaOnUpdate
  .pick({ title: true, body: true })
  .extend({
    categories: z
      .array(categorySchemaOnPostForm)
      // .array()
      .max(5, 'カテゴリーは5つまでしか設定できません.'),
  });

export type UpdatePostParams = z.infer<typeof postSchemaOnUpdate>;
export type PostFormParamsOnUpdate = z.infer<typeof postFormSchemaOnUpdate>;
