import { Box, Flex, Grid, Text } from '@chakra-ui/layout';
import { FC, memo, useCallback } from 'react';

import { UserPostCard } from '@/components/domain/post/UserPostCard';
import { Button } from '@/components/ui/Button';
import { Loading } from '@/components/ui/Loading';
import { useAllPosts } from '@/repositories/posts';
import { useAuth } from '@/services/auth/AuthProvider';
import { Link } from '@/utils/route/Link';
import { useWindowScroll } from '@/utils/useWindowScroll';

import { Error } from '../error/Error';

const LOADER_HEIGHT = '40px';
const MAX_POSTS_COUNTS = 100;
const REFRESH_INTERVAL = 1000 * 60 * 10;
const LIMIT = 12;

const MemoedPostCard = memo(UserPostCard, (prev, next) => {
  return prev.post.id === next.post.id;
});

export const TopPage: FC = () => {
  const { me, isLoading } = useAuth();
  const { data, error, loadMore, isLast, isValidating } = useAllPosts(LIMIT, {
    refreshInterval: REFRESH_INTERVAL,
  });
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
      {!isLoading && !me && (
        <Flex flexDirection="column" alignItems="center">
          <Text variant="secondary" fontSize="xl">
            <Text as="span" fontWeight="bold" variant="primary" fontSize="2xl">
              Tubetter
            </Text>{' '}
            （つべったー）はお気に入りの動画をシェアするサービスです
          </Text>
          <Text variant="secondary" fontSize="md">
            <Text variant="secondary" as="span" textDecoration="underline">
              <Link path="/login">こちら</Link>
            </Text>{' '}
            からログインしてアカウント投稿やユーザーのフォローをしてみましょう！
          </Text>
        </Flex>
      )}
      <Text variant="pageTitle">新着投稿</Text>

      {data ? (
        <Grid
          gridTemplateColumns="repeat(auto-fit, minmax(360px, 1fr))"
          gap={4}
        >
          {data.map((posts) =>
            posts.map((post) => (
              <MemoedPostCard key={post.id} post={post} user={post.user} />
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
