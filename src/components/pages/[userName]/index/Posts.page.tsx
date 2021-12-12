import { ChevronRightIcon } from '@chakra-ui/icons';
import { Flex, Grid, Icon, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { FC, useCallback } from 'react';

import { PostCard } from '@/components/domain/post/PostCard';
import { Loading } from '@/components/ui/Loading';
import { Paginator } from '@/components/ui/Paginator';
import { Select } from '@/components/ui/Select';
import { useCategories } from '@/repositories/category';
import { useUserPosts } from '@/repositories/posts';
import { getPath } from '@/utils/route/Link';
import { Paths } from '@/utils/route/paths';

import { NoResource } from '../../../layouts/NoResource';
import { Error } from '../../error/Error';

const USER_POSTS_PER_PAGE = 4;
type Props = {
  userName?: string;
  categoryName?: string;
  page: number;
};
const PostsPageComponent: FC<Props> = ({ userName, categoryName, page }) => {
  const router = useRouter();
  const {
    data: userPosts,
    error: userPostsError,
    totalPage,
  } = useUserPosts(page, USER_POSTS_PER_PAGE, userName, categoryName);
  const { data: categories, error: categoriesError } = useCategories(userName);

  const onChangePage = useCallback(
    (pageNumber: number) => {
      if (userName) {
        router.push(
          getPath({
            path: Paths.posts,
            params: { userName },
            query: { page: pageNumber, category: categoryName },
          }),
          undefined,
          { shallow: true }
        );
      }
    },
    [router, userName, categoryName]
  );

  const onSelectCategory = useCallback(
    (option: { value: string; label: string } | null) => {
      if (userName) {
        if (!option) {
          router.push(
            getPath({
              path: Paths.posts,
              params: { userName },
            }),
            undefined,
            { shallow: true }
          );
        } else {
          router.push(
            getPath({
              path: Paths.posts,
              params: { userName },
              query: { category: option.value },
            }),
            undefined,
            { shallow: true }
          );
        }
      }
    },
    [router, userName]
  );

  if (userPostsError) {
    return <Error error={userPostsError.serialize()} />;
  }
  if (categoriesError) {
    return <Error error={categoriesError.serialize()} />;
  }

  const categoryOptions = categories
    ? categories.map((c) => ({ value: c.name, label: c.name }))
    : [];

  return (
    <Flex flexDirection="column" sx={{ gap: '1rem' }}>
      <Flex
        justifyContent="space-between"
        alignItems={{ base: 'flex-start', sm: 'center' }}
        flexDirection={{ base: 'column', sm: 'row' }}
        sx={{ gap: '.5rem' }}
      >
        <Flex alignItems="flex-end" sx={{ gap: '1rem' }}>
          <Text variant="pageTitle" lineHeight="1.2">
            投稿
          </Text>
          {categoryName && (
            <>
              <Text variant="pageTitle" display="flex" fontSize="xl" pb="2px">
                <Icon as={ChevronRightIcon} />
              </Text>
              <Text variant="pageTitle" fontSize="xl" lineHeight="1.2">
                {categoryName}
              </Text>
            </>
          )}
        </Flex>
        <Select
          isClearable
          placeholder="カテゴリー"
          value={
            categoryName ? { value: categoryName, label: categoryName } : null
          }
          options={categoryOptions}
          onChange={onSelectCategory}
          noOptionsMessage={() => 'カテゴリーがありません'}
        />
      </Flex>
      {userPosts && userPosts.posts.length == 0 && (
        <NoResource resourceName="投稿" />
      )}
      <Flex
        minHeight="800px"
        flexDirection="column"
        justifyContent="space-between"
        sx={{ gap: '1rem' }}
      >
        {userPosts ? (
          <Grid
            templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
            gap={4}
          >
            {userPosts.posts.map((post) => (
              // <PostCard key={post.id} post={post} user={data} />
              <PostCard embeded key={post.id} post={post} user={userPosts} />
            ))}
          </Grid>
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

export const PostsPage = React.memo(PostsPageComponent);
