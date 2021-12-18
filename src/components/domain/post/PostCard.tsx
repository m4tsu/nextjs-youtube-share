import { Flex, Text } from '@chakra-ui/layout';
import { useRouter } from 'next/router';
import React, { FC, useCallback } from 'react';

import { Card } from '@/components/ui/Card';
import { VideoPlayer } from '@/components/ui/VideoPlayer';
import { toast } from '@/lib/chakraUI/theme';
import { fromNow } from '@/lib/dayjs/utils';
import { postsRepository } from '@/repositories/posts';
import { useAuth } from '@/services/auth/AuthProvider';
import { Post } from '@/types/domains/post';
import { User } from '@/types/domains/user';
import { getEmbedUrl, getThumbnail } from '@/utils/domains/post/video';
import { Link } from '@/utils/route/Link';
import { Paths } from '@/utils/route/paths';
import { HttpError } from '@/utils/types/error';

import { CategoryLinkButton } from '../category/CategoryLinkButtion';

import { FavoriteButton } from './FavoriteButton';
import { Thumbnail } from './Thumbnail';

type ComponentProps = {
  embeded?: boolean;
  post: Post;
  user: User;
  onFavorite: (postId: Post['id']) => Promise<void>;
  onUnFavorite: (postId: Post['id']) => Promise<void>;
};
const Component = ({
  embeded = false,
  post,
  user,
  onFavorite,
  onUnFavorite,
}: ComponentProps) => (
  <Card
    asLinkBox
    p={2}
    overflow="hidden"
    display="flex"
    flexDirection="column"
    sx={{ gap: '.5rem' }}
  >
    {embeded ? (
      <VideoPlayer embedUrl={getEmbedUrl(post.type, post.videoId)} />
    ) : (
      <Thumbnail src={getThumbnail(post)} alt={`${post.title}のサムネイル`} />
    )}

    <Flex
      direction="column"
      overflow="hidden"
      sx={{ gap: '2px' }}
      p={0}
      flex="1"
    >
      <Link
        asOverLay
        path={Paths.post}
        params={{ userName: user.userName, postId: post.id }}
      >
        <Text
          fontSize="lg"
          fontWeight="bold"
          overflow="hidden"
          sx={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {post.title}
        </Text>
      </Link>

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
      </Flex>

      <Flex
        justifyContent="space-between"
        alignItems="center"
        mt="auto"
        sx={{ gap: '.5rem' }}
      >
        <Text as="time" variant="secondary" fontSize="sm" flexShrink={0}>
          {fromNow(post.createdAt)}
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
    </Flex>
  </Card>
);

type Props = Pick<ComponentProps, 'user' | 'post' | 'embeded'>;
export const PostCard: FC<Props> = ({ post, user, embeded }) => {
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
    <Component
      embeded={embeded}
      user={user}
      post={post}
      onFavorite={onFavorite}
      onUnFavorite={onUnFavorite}
    />
  );
};
