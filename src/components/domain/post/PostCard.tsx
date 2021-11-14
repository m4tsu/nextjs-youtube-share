import { Box, Divider, Flex, Text } from '@chakra-ui/layout';
import { useRouter } from 'next/router';
import React, { FC, useCallback } from 'react';

import { Card } from '@/components/ui/Card';
import { VideoPlayer } from '@/components/ui/VideoPlayer';
import { toast } from '@/lib/chakraUI/theme';
import { toDate } from '@/lib/dayjs/utils';
import { postsRepository } from '@/repositories/posts';
import { useAuth } from '@/services/auth/AuthProvider';
import { Post } from '@/types/domains/post';
import { User } from '@/types/domains/user';
import { getEmbedUrl } from '@/utils/domains/post/video';
import { Link } from '@/utils/route/Link';
import { Paths } from '@/utils/route/paths';
import { HttpError } from '@/utils/types/error';

import { CategoryLinkButton } from '../category/CategoryLinkButtion';

import { FavoriteButton } from './FavoriteButton';

type Props = {
  post: Post;
  user: User;
};
export const PostCard: FC<Props> = ({ post, user }) => {
  const router = useRouter();
  const { me } = useAuth();

  const onUnFavorite = useCallback(
    async (postId: string) => {
      if (!me) {
        router.push({ pathname: Paths.login });
        return;
      }
      try {
        await postsRepository.unFavorite(postId);
        toast({ title: 'お気に入りを解除しました.', status: 'success' });
      } catch (e) {
        if (e instanceof HttpError) {
          if (e.status === 404) {
            router.push(Paths.login);
            return;
          }
        } else {
          throw e;
        }
      }
    },
    [router, me]
  );

  const onFavorite = useCallback(
    async (postId: string) => {
      if (!me) {
        router.push({ pathname: Paths.login });
        return;
      }
      try {
        await postsRepository.favorite(postId);
        toast({ title: 'お気に入りしました.', status: 'success' });
      } catch (e) {
        if (e instanceof HttpError) {
          if (e.status === 404) {
            router.push(Paths.login);
            return;
          }
        } else {
          throw e;
        }
      }
    },
    [router, me]
  );

  return (
    <Card asLinkBox p={4} overflow="hidden">
      <Flex direction="column" overflow="hidden">
        <VideoPlayer embedUrl={getEmbedUrl(post.type, post.videoId)} />
        <Box my={1}>
          <Link
            asOverLay
            path={Paths.post}
            params={{ userName: user.userName, postId: post.id }}
          >
            <Text
              fontSize="lg"
              fontWeight="bold"
              overflow="hidden"
              textOverflow="ellipsis"
              whiteSpace="nowrap"
            >
              {post.title}
            </Text>
          </Link>
        </Box>
        <Flex justifyContent="space-between" alignItems="center">
          <Text
            mr={1}
            variant="secondary"
            fontSize="sm"
            overflow="hidden"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
          >
            {post.body}
          </Text>
          <FavoriteButton
            position="relative"
            favorited={post.favorited ?? false}
            postId={post.id}
            userName={user.userName}
            favoritesCount={post.favoritesCount || 0}
            onFavorite={onFavorite}
            onUnFavorite={onUnFavorite}
          />
        </Flex>
        <Divider color="gray.400" my={1} />
        <Flex sx={{ gap: '.5rem' }} alignItems="center" mt={1}>
          <Text as="time" variant="secondary" fontSize="sm" flexShrink={0}>
            {toDate(post.updatedAt)}
          </Text>
          <Flex
            sx={{ gap: '.5rem' }}
            flex="1 1 auto"
            alignItems="center"
            flexWrap="wrap"
          >
            {post.categories &&
              post.categories.map((category) => (
                <CategoryLinkButton
                  categoryName={category.name}
                  userName={user.userName}
                  key={`${post.id}-${category.id}`}
                />
              ))}
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
};
