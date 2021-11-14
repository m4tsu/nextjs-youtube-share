import { Flex, Grid } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { FC, useCallback } from 'react';

import { PostCard } from '@/components/domain/post/PostCard';
import { NoResourceError } from '@/components/pages/error/NoResourceError';
import { Loading } from '@/components/ui/Loading';
import { Paginator } from '@/components/ui/Paginator';
import { useUserPosts } from '@/repositories/posts';
import { getPath } from '@/utils/route/Link';
import { Paths } from '@/utils/route/paths';

const USER_POSTS_PER_PAGE = 4;
type Props = {
  userName?: string;
  categoryName?: string;
  page: number;
};
const PostsPageComponent: FC<Props> = ({ userName, categoryName, page }) => {
  const router = useRouter();
  const { data, error, totalPage } = useUserPosts(
    page,
    USER_POSTS_PER_PAGE,
    userName,
    categoryName
  );
  const onChangePage = useCallback(
    (pageNumber: number) => {
      if (userName) {
        router.push(
          getPath({
            path: Paths.posts,
            params: { userName },
            query: { page: pageNumber, category: categoryName },
          })
        );
      }
    },
    [router, userName, categoryName]
  );

  if (error) {
    return <NoResourceError resourceName="投稿" />;
  }
  if (!data || !userName) {
    return <Loading />;
  }
  if (totalPage && page > totalPage) {
    router.push(getPath({ path: Paths.posts, params: { userName } }));
  }

  return (
    <Flex flexDirection="column" sx={{ gap: '1rem' }}>
      <Grid
        templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
        gap={4}
      >
        {data.posts.map((post) => (
          <PostCard key={post.id} post={post} user={data} />
        ))}
      </Grid>
      {totalPage && (
        <Paginator
          currentPage={page}
          totalPage={totalPage}
          onPageChange={onChangePage}
        />
      )}
    </Flex>
  );
};

export const PostsPage = React.memo(PostsPageComponent);
