import { StarIcon } from '@chakra-ui/icons';
import { Image } from '@chakra-ui/image';
import { Box, Flex, Text } from '@chakra-ui/layout';
import { FC } from 'react';

import { Button } from '@/components/ui/Button';
import { Panel } from '@/components/ui/Panel';
import { toDate } from '@/lib/dayjs/utils';
import { Post } from '@/types/domains/post';
import { User } from '@/types/domains/user';
import { getThumbnail } from '@/utils/domains/post/video';
import { Link } from '@/utils/route/Link';
import { Paths } from '@/utils/route/paths';

type Props = {
  post: Post;
  user: User;
};

export const PostPanel: FC<Props> = ({ post, user }) => {
  return (
    <Link
      path={Paths.post}
      params={{ userName: user.userName, postId: post.id }}
    >
      <Panel
        borderRadius="md"
        boxShadow="sm"
        display="flex"
        borderColor="gray.300"
        borderWidth="1px"
        _hover={{ boxShadow: 'lg' }}
        transition="ease"
        transitionDuration="200ms"
      >
        <Flex direction="column" flexBasis="400px" sx={{ gap: '.5rem' }}>
          <Image maxWidth="400px" src={getThumbnail(post)} />
          <Text color="gray.800" fontSize="lg" fontWeight="bold">
            {post.title}
          </Text>
          <Flex justifyContent="space-between" alignItems="center">
            <Text as="time" variant="secondary">
              {toDate(post.updatedAt)}
            </Text>
            <StarIcon color="yellow" />
          </Flex>
          <Flex sx={{ gap: '.5rem' }}>
            <Button isLink color="blue.500">
              tagA
            </Button>
            <Button isLink color="blue.500">
              tagB
            </Button>
            <Button isLink color="blue.500">
              tagC
            </Button>
          </Flex>
        </Flex>
        <Flex
          direction="column"
          px="4"
          flex="1"
          sx={{ gap: '.5rem' }}
          overflow="hidden"
        >
          <Flex alignItems="center" sx={{ gap: '1rem' }}>
            <Image
              src={user.avatarUrl}
              borderRadius="full"
              display="block"
              width="45px"
              height="45px"
            />
            <Box overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis">
              <Text
                fontSize="lg"
                fontWeight="bold"
                overflow="hidden"
                whiteSpace="nowrap"
                textOverflow="ellipsis"
              >
                {user.displayName}
              </Text>
              <Text
                variant="secondary"
                fontSize="md"
                overflow="hidden"
                whiteSpace="nowrap"
                textOverflow="ellipsis"
              >
                {user.userName}
              </Text>
            </Box>
          </Flex>
          <Flex>
            <Text>{post.body}</Text>
          </Flex>
        </Flex>
      </Panel>
    </Link>
  );
};
