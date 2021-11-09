import { Box, Flex, Text } from '@chakra-ui/layout';
import { Tag } from '@chakra-ui/tag';
import { FC, memo } from 'react';

import { FavoriteButton } from '@/components/domain/post/FavoriteButton';
import { NoResourceError } from '@/components/pages/error/NoResourceError';
import { Loading } from '@/components/ui/Loading';
import { Panel } from '@/components/ui/Panel';
import { VideoPlayer } from '@/components/ui/VideoPlayer';
import { toDate } from '@/lib/dayjs/utils';
import { usePost } from '@/repositories/posts';
import { getEmbedUrl } from '@/utils/domains/post/video';

type Props = {
  userName?: string;
  postId?: string;
};

const PostPageComponent: FC<Props> = ({ userName, postId }) => {
  const { data, error } = usePost(userName, postId);

  if (error) return <NoResourceError resourceName="投稿" />;
  if (!data) return <Loading />;

  const { type, videoId, title, body, updatedAt, categories } = data;
  const embedUrl = getEmbedUrl(type, videoId);
  return (
    <Panel display="flex" flexDirection="column" gridGap="2">
      <VideoPlayer embedUrl={embedUrl} />
      <Text as="h1" color="textMain" fontWeight="bold" fontSize="xl">
        {title}
      </Text>
      <Flex
        alignItems="center"
        gridGap="2"
        borderBottomWidth="thin"
        borderBottomColor="gray.200"
        pb={2}
      >
        <Text as="time" color="textSub">
          {toDate(updatedAt)}
        </Text>
        <Box flex="1 1 auto">
          {categories &&
            categories.map((category) => (
              <Tag key={category.id}>{category.name}</Tag>
            ))}
        </Box>
        <Flex flexShrink={0} alignItems="center">
          {userName && (
            <FavoriteButton
              postId={data.id}
              userName={userName}
              favorited={data.favorited || false}
              favoritesCount={data.favoritesCount || 0}
            />
          )}
        </Flex>
      </Flex>
      <Box>
        <Text color="textMain">{body}</Text>
      </Box>
    </Panel>
  );
};

export const PostPage = memo(PostPageComponent);
