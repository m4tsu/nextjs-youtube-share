import { Avatar } from '@chakra-ui/avatar';
import { FormControl } from '@chakra-ui/form-control';
import { Box, Flex } from '@chakra-ui/layout';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';
import { toast } from '@/lib/chakraUI/theme';
import { commentsRepository } from '@/repositories/comment';
import {
  commentSchemaOnCreate,
  NewCommentParams,
} from '@/types/domains/comment';
import { Post } from '@/types/domains/post';
import { User } from '@/types/domains/user';

type Props = {
  me: User;
  postId: Post['id'];
  userName: User['userName'];
};
export const CommentForm: FC<Props> = ({ me, postId, userName }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<NewCommentParams>({
    mode: 'onChange',
    resolver: zodResolver(commentSchemaOnCreate),
  });
  const onSubmit = handleSubmit(async (params) => {
    try {
      await commentsRepository.createComment(userName, postId, params);
      toast({ status: 'success', title: 'コメントが完了しました。' });
    } catch (e) {
      toast({ status: 'error', title: 'コメントに失敗しました。' });
    }
    reset();
  });
  return (
    <Flex
      sx={{ gap: '0.5rem' }}
      alignItems="flex-start"
      as="form"
      onSubmit={onSubmit}
    >
      <Box>
        <Avatar src={me.avatarUrl} boxSize="36px" />
      </Box>
      <FormControl isInvalid={!!errors.content}>
        <Textarea
          placeholder="この投稿にコメントする"
          defaultValue=""
          {...register('content')}
          variant="flushed"
          p={2}
        />
      </FormControl>
      <Button
        colorScheme="primary"
        type="submit"
        size="sm"
        px="6"
        flexShrink={0}
        disabled={!!errors.content}
      >
        送信
      </Button>
    </Flex>
  );
};
