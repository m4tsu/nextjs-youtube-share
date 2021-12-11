import { z } from 'zod';

import { schemaForType } from '@/lib/zod/schemaForType';

import { Category as PrismaCategory } from '.prisma/client';

export type Category = PrismaCategory;

export const categorySchema = schemaForType<PrismaCategory>()(
  z.object({
    id: z.number(),
    userId: z.string().uuid(),
    name: z
      .string()
      .min(1, 'カテゴリー名を入力してください.')
      .max(20, 'カテゴリー名は20文字以下で入力してください.'),
    createdAt: z.date(),
    updatedAt: z.date(),
  })
);

export const categorySchemaOnCreate = categorySchema.pick({
  name: true,
  userId: true,
});

export const categorySchemaOnUpdate = categorySchema.pick({
  name: true,
  userId: true,
  id: true,
});

export const categorySchemaOnPostForm = z.union([
  categorySchemaOnCreate.omit({ userId: true, name: true }).extend({
    value: categorySchema.shape.name,
    label: categorySchema.shape.name,
    __isNew__: z.boolean(),
  }),
  categorySchemaOnUpdate.omit({ userId: true, name: true }).extend({
    value: categorySchema.shape.name,
    label: categorySchema.shape.name,
  }),
]);
