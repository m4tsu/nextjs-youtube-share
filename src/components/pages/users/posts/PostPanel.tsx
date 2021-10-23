import { Button } from '@/components/common/Button';
import { Panel } from '@/components/common/Panel';
import { toDate } from '@/lib/dayjs/utils';
import { Link } from '@/utils/route/Link';
import { Paths } from '@/utils/route/paths';
import { getThumbnail } from '@/utils/posts/video';
import { StarIcon } from '@chakra-ui/icons';
import { Image } from '@chakra-ui/image';
import { Box, Flex, Text } from '@chakra-ui/layout';
import { FC } from 'react';
import { Post } from '@/types/domain/posts';
import { User } from '@/types/domain/users';

type Props = {
  post: Post;
  user: User;
};

export const PostPanel: FC<Props> = ({ post, user }) => {
  return (
    <Link
      path={Paths.post}
      params={{ user_name: user.user_name, post_id: post.id }}
    >
      <Panel
        borderRadius="md"
        boxShadow="sm"
        display="flex"
        borderColor="gray.300"
        borderWidth="1px"
        _hover={{ boxShadow: 'lg' }}
        transition="ease"
        transitionDuration="300ms"
      >
        <Flex direction="column" flexBasis="400px" sx={{ gap: '.5rem' }}>
          <Image
            maxWidth="400px"
            src={getThumbnail(post.type, post.video_id)}
          />
          <Text color="gray.800" fontSize="lg" fontWeight="bold">
            {post.title}
          </Text>
          <Flex justifyContent="space-between" alignItems="center">
            <Text as="time" color="textSub">
              {toDate(post.updated_at)}
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
              src={user.photo_url}
              borderRadius="full"
              display="block"
              width="45px"
              height="45px"
            />
            <Box overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis">
              <Text
                color="textMain"
                fontSize="lg"
                fontWeight="bold"
                overflow="hidden"
                whiteSpace="nowrap"
                textOverflow="ellipsis"
              >
                {user.display_name}
              </Text>
              <Text
                color="textSub"
                fontSize="md"
                overflow="hidden"
                whiteSpace="nowrap"
                textOverflow="ellipsis"
              >
                {user.user_name}
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
