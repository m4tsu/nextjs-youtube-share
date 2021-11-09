import { Box, Divider, Flex, Text } from '@chakra-ui/layout';
import { Spacer } from '@chakra-ui/react';
import { Tag } from '@chakra-ui/tag';
import { FC } from 'react';

import { Card } from '@/components/ui/Card';
import { VideoPlayer } from '@/components/ui/VideoPlayer';
import { Post } from '@/types/domains/post';
import { User } from '@/types/domains/user';
import { getEmbedUrl } from '@/utils/domains/post/video';
import { Link } from '@/utils/route/Link';
import { Paths } from '@/utils/route/paths';

import { FavoriteButton } from './FavoriteButton';

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
            {post.categories &&
              post.categories.map((category) => (
                <Tag
                  key={category.id}
                  isLink
                  fontSize="sm"
                  fontWeight="normal"
                  color="blue.500"
                  borderRadius="none"
                  height="fit-content"
                  p="2"
                >
                  {category.name}
                </Tag>
              ))}
          </Flex>
          <Divider color="gray.500" />
          <Flex justifyContent="space-around">
            <Spacer />
            <FavoriteButton
              favorited={post.favorited ?? false}
              postId={post.id}
              userName={user.userName}
              favoritesCount={post.favoritesCount || 0}
            />
          </Flex>
        </Flex>
      </Card>
    </Link>
  );
};
