import { z } from 'zod';

import { schemaForType } from '@/lib/zod/schemaForType';
import { validateUrl } from '@/utils/domains/post/video';

import { Post, VideoType } from '.prisma/client';

export type { Post, VideoType };

export type NicovideoInfo = {
  thumbnailUrl: string;
  title: string;
};

export const postSchema = schemaForType<Post>()(
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
  .extend({ thumbnailUrl: z.string().optional() });

export const postFormSchema = postSchemaOnCreate
  .omit({ videoId: true })
  .extend({
    videoUrl: z.string().min(1, 'URLを入力してください.'),
  })
  .refine(
    (data) => {
      console.log('regine!!!!', data);
      const result = validateUrl(data.type, data.videoUrl);
      return result.isValid;
    },
    { message: 'URLの形式が間違っています.', path: ['videoUrl'] }
  );

export type NewPostParams = z.infer<typeof postSchemaOnCreate>;
export type PostFormParams = z.infer<typeof postFormSchema>;
