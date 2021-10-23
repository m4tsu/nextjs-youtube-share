import { Button } from '@/components/common/Button';
import { Panel } from '@/components/common/Panel';
import { VideoPlayer } from '@/components/common/VideoPlayer';
import { toDate } from '@/lib/dayjs/utils';
import { Post } from '@/types/domain/posts';
import { getEmbedUrl } from '@/utils/posts/video';
import { StarIcon } from '@chakra-ui/icons';
import { Box, Flex, Text } from '@chakra-ui/layout';
import { FC } from 'react';

type Props = {
  post: Post;
};

export const PostPageComponent: FC<Props> = ({
  post: { video_id, type, title, body, updated_at },
}) => {
  const embedUrl = getEmbedUrl(type, video_id);
  return (
    <Panel display="flex" flexDirection="column" sx={{ gap: '1rem' }}>
      <VideoPlayer embedUrl={embedUrl} />
      <Text as="h1" color="textMain" fontWeight="bold" fontSize="xl">
        {title}
      </Text>
      <Flex
        alignItems="center"
        sx={{ gap: '1rem' }}
        borderBottomWidth="thin"
        borderBottomColor="gray.200"
        pb={2}
      >
        <Text as="time" color="textSub">
          {toDate(updated_at)}
        </Text>
        <Box flex="1 1 auto">
          <Button>hoge</Button>
          <Button>poyo</Button>
        </Box>
        <Flex flexShrink={0} alignItems="center">
          <StarIcon />
        </Flex>
      </Flex>
      <Box>
        <Text color="textMain">{body}</Text>
      </Box>
    </Panel>
  );
};
