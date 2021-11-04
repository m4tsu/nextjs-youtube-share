import { Box, Flex, Text } from '@chakra-ui/layout';
import { FC } from 'react';

import { FavoriteButton } from '@/components/domain/user/post/FavariteButton';
import { NoResourceError } from '@/components/pages/error/NoResourceError';
import { Button } from '@/components/ui/Button';
import { Loading } from '@/components/ui/Loading';
import { Panel } from '@/components/ui/Panel';
import { VideoPlayer } from '@/components/ui/VideoPlayer';
import { toDate } from '@/lib/dayjs/utils';
import { usePost } from '@/repositories/posts';
import { useAuth } from '@/services/auth/AuthProvider';
import { getEmbedUrl } from '@/utils/domains/post/video';

type Props = {
  // post: Post;
  userName?: string;
  postId?: string;
};

export const PostPage: FC<Props> = ({ userName, postId }) => {
  const { data, error } = usePost(userName, postId);
  const { me } = useAuth();
  console.log('post!!', data);
  if (error) return <NoResourceError resourceName="投稿" />;
  if (!data) return <Loading />;
  const { type, videoId, title, body, updatedAt, createdAt } = data;
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
          <Button>hoge</Button>
          <Button>poyo</Button>
        </Box>
        <Flex flexShrink={0} alignItems="center">
          {me && <FavoriteButton postId={data.id} favorited={data.favorited} />}
        </Flex>
      </Flex>
      <Box>
        <Text color="textMain">{body}</Text>
      </Box>
    </Panel>
  );
};
