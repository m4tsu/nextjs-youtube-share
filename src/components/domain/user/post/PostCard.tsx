import { MoonIcon, StarIcon } from '@chakra-ui/icons';
import { Box, Divider, Flex, Text } from '@chakra-ui/layout';
import { FC } from 'react';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { VideoPlayer } from '@/components/ui/VideoPlayer';
import { getEmbedUrl } from '@/utils/domains/post/video';
import { Link } from '@/utils/route/Link';
import { Paths } from '@/utils/route/paths';

import { Post, User } from '.prisma/client';

type Props = {
  post: Post;
  user: User;
};
export const PostCard: FC<Props> = ({ post, user }) => {
  return (
    <Link
      path={Paths.post}
      params={{ userName: user.userName, postId: post.id }}
      chakraLinkProps={{ overflow: 'hidden', p: '5px', m: '-5px' }} // hiddenによりbox-shadowが消される問題への対処
    >
      <Card>
        <Flex direction="column" sx={{ gap: '.5rem' }} overflow="hidden">
          <VideoPlayer embedUrl={getEmbedUrl(post.type, post.videoId)} />
          <Box>
            <Text
              color="gray.800"
              fontSize="lg"
              fontWeight="bold"
              overflow="hidden"
              textOverflow="ellipsis"
              whiteSpace="nowrap"
            >
              {post.title}
            </Text>
          </Box>

          <Flex sx={{ gap: '.5rem' }}>
            {['カテゴリA', 'カテゴリB'].map((category) => (
              <Button
                key={category}
                isLink
                fontSize="sm"
                fontWeight="normal"
                color="blue.500"
                borderRadius="none"
                height="fit-content"
                p="2"
              >
                {category}
              </Button>
            ))}
          </Flex>
          <Divider color="gray.500" />
          <Flex justifyContent="space-around">
            <MoonIcon color="blue" />
            <StarIcon color="yellow" />
          </Flex>
        </Flex>
      </Card>
    </Link>
  );
};
