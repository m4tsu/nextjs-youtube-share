import { Grid } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { FC, useCallback } from 'react';

import { PostCard } from '@/components/domain/post/PostCard';
import { NoResourceError } from '@/components/pages/error/NoResourceError';
import { Loading } from '@/components/ui/Loading';
import { Paginator } from '@/components/ui/Paginator';
import { Panel } from '@/components/ui/Panel';
import { useUserPosts } from '@/repositories/posts';
import { getPath } from '@/utils/route/Link';

const USER_POSTS_PER_PAGE = 4;
type Props = {
  userName?: string;
  page: number;
};
const PostsPageComponent: FC<Props> = ({ userName, page }) => {
  const router = useRouter();
  const { data, error, totalPage } = useUserPosts(
    page,
    USER_POSTS_PER_PAGE,
    userName
  );
  const onChangePage = useCallback(
    (pageNumber: number) => {
      if (userName) {
        router.push(
          `${getPath({
            path: '/[userName]',
            params: { userName },
          })}?page=${pageNumber}`
        );
      }
    },
    [router, userName]
  );

  if (error) {
    return <NoResourceError resourceName="投稿" />;
  }
  if (!data || !userName) {
    return <Loading />;
  }
  if (totalPage && page > totalPage) {
    router.push(getPath({ path: '/[userName]', params: { userName } }));
  }

  return (
    <Panel display="flex" flexDirection="column" sx={{ gap: '1rem' }}>
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
    </Panel>
  );
};

export const PostsPage = React.memo(PostsPageComponent);
