import { Avatar } from '@chakra-ui/avatar';
import { DeleteIcon } from '@chakra-ui/icons';
import { Flex, Box, Text } from '@chakra-ui/layout';
import { useDisclosure } from '@chakra-ui/react';
import { FC } from 'react';

import { Button } from '@/components/ui/Button';
import { toDateTime } from '@/lib/dayjs/utils';
import { useAuth } from '@/services/auth/AuthProvider';
import { Comment } from '@/types/domains/comment';
import { User } from '@/types/domains/user';
import { Link } from '@/utils/route/Link';

import { DeleteCommentModal } from './DeleteCommentModal';

type Props = {
  comment: Comment;
  userName: User['userName'];
  isMyPost?: boolean;
};
export const CommentCard: FC<Props> = ({ comment, userName, isMyPost }) => {
  const { me } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMyComment = me?.id === comment.userId;

  return (
    <>
      <Flex sx={{ gap: '1rem' }}>
        <Box>
          <Link
            path="/users/[userName]"
            params={{ userName: comment.user.userName }}
          >
            <Avatar src={comment.user.avatarUrl} boxSize="36px" />
          </Link>
        </Box>
        <Flex flexDirection="column" flexGrow={1} sx={{ gap: '4px' }}>
          <Flex justifyContent="space-between" alignItems="flex-start">
            <Flex sx={{ gap: '1rem' }} fontSize="sm">
              <Link
                path="/users/[userName]"
                params={{ userName: comment.user.userName }}
              >
                {comment.user.displayName}
              </Link>{' '}
              <Text variant="secondary">{toDateTime(comment.createdAt)}</Text>
            </Flex>
          </Flex>

          {comment.deletedBy === null ? (
            <Text whiteSpace="pre-wrap" fontSize="sm">
              {comment.content}
            </Text>
          ) : (
            <Text variant="secondary" fontSize="xs">
              {comment.deletedBy === 'author'
                ? '投稿者によって削除されました。'
                : 'コメントをした本人により削除されました。'}
            </Text>
          )}
        </Flex>
        {!comment.deletedBy && (isMyComment || isMyPost) && (
          <Button
            onClick={onOpen}
            variant="ghost"
            borderRadius="full"
            padding={0}
            flexShrink={0}
            flexGrow={0}
          >
            <DeleteIcon boxSize="14px" />
          </Button>
        )}
      </Flex>
      {(isMyComment || isMyPost) && isOpen && (
        <DeleteCommentModal
          postId={comment.postId}
          commentId={comment.id}
          userName={userName}
          isOpen={isOpen}
          onClose={onClose}
        />
      )}
    </>
  );
};
