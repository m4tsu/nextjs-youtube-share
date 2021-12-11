import {
  FormControl,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Flex } from '@chakra-ui/layout';
import { Textarea } from '@chakra-ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/Button';
import { CreatableSelect } from '@/components/ui/CreatableSelect';
import { toast } from '@/lib/chakraUI/theme';
import { useCategories } from '@/repositories/category';
import { postsRepository } from '@/repositories/posts';
import {
  Post,
  PostFormParamsOnUpdate,
  postFormSchemaOnUpdate,
  UpdatePostParams,
} from '@/types/domains/post';
import { User } from '@/types/domains/user';

type Props = {
  post: Post;
  me: User;
  onUpdated?: () => void;
};
export const EditPost: FC<Props> = ({ post, me, onUpdated }) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isValid, isDirty },
    watch,
    trigger,
    getValues,
    setValue,
  } = useForm<PostFormParamsOnUpdate>({
    mode: 'all',
    defaultValues: {
      body: post.body,
      title: post.title,
      categories: post?.categories?.map(({ name, id }) => ({
        label: name,
        value: name,
        id,
      })),
    },
    resolver: zodResolver(postFormSchemaOnUpdate),
  });
  const { data, error } = useCategories(me.userName);
  const categoryOptions = data
    ? data.map((c) => {
        return {
          id: c.id,
          label: c.name,
          value: c.name,
        };
      })
    : [];

  const categoriesError =
    watch('categories').length > 5
      ? 'カテゴリーは5つまでしか設定できません.'
      : null; // TODO: 何故かzodエラーが出ない

  const onSubmit = async (values: UpdatePostParams) => {
    try {
      await postsRepository.updatePost(post.id, values, me.userName);
    } catch (e) {
      toast({
        title: '更新が失敗しました。',
        status: 'error',
      });
    }
    onUpdated && onUpdated();
  };

  return (
    <Flex
      as="form"
      direction="column"
      gridGap={4}
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormControl isInvalid={!!errors.title}>
        <FormLabel htmlFor="title">タイトル</FormLabel>
        <Input id="title" placeholder="投稿のタイトル" {...register('title')} />
        <FormErrorMessage>
          {errors.title && errors.title.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!categoriesError}>
        <FormLabel htmlFor="categories">カテゴリー</FormLabel>
        <CreatableSelect
          isMulti
          name="categories"
          placeholder="カテゴリーを選択する"
          options={categoryOptions}
          defaultValue={post?.categories?.map(({ name, id }) => ({
            label: name,
            value: name,
            id,
          }))}
          onChange={(values) => {
            setValue('categories', [...values]);
          }}
          formatCreateLabel={(value) => `カテゴリーを作成: ${value}`}
          noOptionsMessage={() => '選択可能なカテゴリーがありません'}
        />
        <FormErrorMessage>
          {categoriesError && categoriesError}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.body}>
        <FormLabel htmlFor="content">本文</FormLabel>
        <Textarea
          id="content"
          placeholder="動画の感想などを入力してください"
          {...register('body')}
        />
        <FormErrorMessage>
          {errors.body && errors.body.message}
        </FormErrorMessage>
      </FormControl>
      <Button
        colorScheme="primary"
        type="submit"
        width="full"
        isLoading={isSubmitting}
        disabled={!isValid || !!categoriesError}
      >
        更新する
      </Button>
    </Flex>
  );
};
