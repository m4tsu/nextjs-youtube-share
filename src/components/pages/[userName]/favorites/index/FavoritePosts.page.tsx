import { Flex, Grid, Text } from '@chakra-ui/layout';
import { useRouter } from 'next/router';
import React, { FC, useCallback } from 'react';

import { UserPostCard } from '@/components/domain/post/UserPostCard';
import { NoResource } from '@/components/layouts/NoResource';
import { Error } from '@/components/pages/error/Error';
import { Loading } from '@/components/ui/Loading';
import { Paginator } from '@/components/ui/Paginator';
import { useUserFavoritePosts } from '@/repositories/posts';
import { getPath } from '@/utils/route/Link';
import { Paths } from '@/utils/route/paths';

const PER_PAGE = 4;
type Props = {
  userName?: string;
  categoryName?: string;
  page: number;
};
export const FavoritePostsPage: FC<Props> = ({
  userName,
  categoryName,
  page,
}) => {
  const router = useRouter();
  const { data, error, totalPage } = useUserFavoritePosts(
    page,
    PER_PAGE,
    userName,
    categoryName
  );

  const onChangePage = useCallback(
    (pageNumber: number) => {
      if (userName) {
        router.push(
          getPath({
            path: Paths.favorites,
            params: { userName },
            query: { page: pageNumber, category: categoryName },
          })
        );
      }
    },
    [router, userName, categoryName]
  );

  if (error) {
    return <Error error={error.serialize()} />;
  }

  return (
    <Flex flexDirection="column" sx={{ gap: '1rem' }}>
      <Text variant="pageTitle">お気に入りした投稿</Text>
      <Flex
        minHeight="800px"
        flexDirection="column"
        justifyContent="space-between"
        sx={{ gap: '1rem' }}
      >
        {data ? (
          data.posts.length === 0 ? (
            <NoResource resourceName="お気に入りした投稿" />
          ) : (
            <Grid
              templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
              gap={4}
            >
              {data.posts.map((post) => (
                <UserPostCard
                  embeded
                  key={post.id}
                  post={post}
                  user={post.user}
                />
              ))}
            </Grid>
          )
        ) : (
          <Loading />
        )}

        {totalPage && (
          <Paginator
            currentPage={page}
            totalPage={totalPage}
            onPageChange={onChangePage}
          />
        )}
      </Flex>
    </Flex>
  );
};
