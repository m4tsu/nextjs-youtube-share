import { Box } from '@chakra-ui/layout';
import { Divider } from '@chakra-ui/react';
import { FC } from 'react';

import { Button } from '@/components/ui/Button';
import { Loading } from '@/components/ui/Loading';
import { Panel } from '@/components/ui/Panel';
import { useAllPosts } from '@/repositories/posts';

export const TopPage: FC = () => {
  const { data, error, size, loadMore, isLast, isValidating } = useAllPosts(3);

  return (
    <Panel>
      Top Page
      <div>
        <Button colorScheme="primary" onClick={loadMore}>
          Load More
        </Button>
        <Divider />
        {!data || isValidating ? (
          <Loading />
        ) : (
          data.map((posts) =>
            posts.map((post) => (
              <Box key={post.id} border="1px solid black">
                {post.id}: {post.title}
              </Box>
            ))
          )
        )}
      </div>
    </Panel>
  );
};
