import { Box, Flex, Grid, Text } from '@chakra-ui/layout';
import React, { FC, memo, useCallback } from 'react';

import { UserPostCard as PostCard } from '@/components/domain/post/UserPostCard';
import { Button } from '@/components/ui/Button';
import { Loading } from '@/components/ui/Loading';
import { useTimeline } from '@/repositories/posts';
import { useWindowScroll } from '@/utils/useWindowScroll';

import { Error } from '../../error/Error';

const UserPostCard = memo(
  PostCard,
  (prev, next) => prev.post.id === next.post.id
);

const MAX_POSTS_COUNTS = 100;
const LIMIT = 8;
const LOADER_HEIGHT = '40px';
export const HomePage: FC = () => {
  const { data, error, isValidating, loadMore, isLast } = useTimeline(LIMIT);
  const fetchLimited = data ? data.length >= MAX_POSTS_COUNTS / LIMIT : false;

  const handleScroll = useCallback(() => {
    if (isLast || isValidating || fetchLimited) return;
    const threshold = 40;
    const doc = document.documentElement;
    const { scrollHeight, scrollTop, clientHeight } = doc;
    if (scrollHeight - scrollTop - threshold < clientHeight) {
      loadMore();
    }
  }, [isLast, fetchLimited, loadMore, isValidating]);

  useWindowScroll(handleScroll, 100);

  if (error) return <Error error={error} />;

  return (
    <Flex flexDirection="column" sx={{ gap: '1rem' }}>
      <Text variant="pageTitle">フォロー中のユーザーの投稿</Text>
      {data ? (
        <Grid
          templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
          gap={4}
        >
          {data.map((posts) =>
            posts.map((post) => (
              <UserPostCard key={post.id} post={post} user={post.user} />
            ))
          )}
        </Grid>
      ) : (
        <Loading />
      )}
      {!isLast && data && !isValidating && (
        <Button
          colorScheme="primary"
          variant="outline"
          onClick={() => {
            loadMore();
          }}
          width="full"
          sx={{ height: LOADER_HEIGHT }}
        >
          もっと見る
        </Button>
      )}
      {isLast && <Box width="full" height={LOADER_HEIGHT} />}
      {data && isValidating && <Loading sx={{ height: LOADER_HEIGHT }} />}
    </Flex>
  );
};
