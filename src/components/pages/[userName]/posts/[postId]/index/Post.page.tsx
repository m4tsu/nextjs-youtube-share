import { Box, Divider, Flex, Text } from '@chakra-ui/layout';
import { useRouter } from 'next/router';
import React, { FC, memo, useCallback } from 'react';

import { CategoryLinkButton } from '@/components/domain/category/CategoryLinkButtion';
import { FavoriteButton } from '@/components/domain/post/FavoriteButton';
import { NoResourceError } from '@/components/pages/error/NoResourceError';
import { Loading } from '@/components/ui/Loading';
import { Panel } from '@/components/ui/Panel';
import { VideoPlayer } from '@/components/ui/VideoPlayer';
import { toast } from '@/lib/chakraUI/theme';
import { toDate } from '@/lib/dayjs/utils';
import { postsRepository, usePost } from '@/repositories/posts';
import { useAuth } from '@/services/auth/AuthProvider';
import { getEmbedUrl } from '@/utils/domains/post/video';
import { Paths } from '@/utils/route/paths';
import { HttpError } from '@/utils/types/error';

type Props = {
  userName?: string;
  postId?: string;
};

const PostPageComponent: FC<Props> = ({ userName, postId }) => {
  const router = useRouter();

  const { data, error } = usePost(userName, postId);
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

  if (error) return <NoResourceError resourceName="投稿" />;
  if (!userName || !data) return <Loading />;

  const { type, videoId, title, body, updatedAt, categories } = data;
  const embedUrl = getEmbedUrl(type, videoId);
  return (
    <Panel display="flex" flexDirection="column" gridGap="2">
      <VideoPlayer embedUrl={embedUrl} />
      <Text as="h1" color="textMain" fontWeight="bold" fontSize="3xl">
        {title}
      </Text>
      <Flex alignItems="center" gridGap="2" fontSize="md">
        <Text as="time" color="textSub" flexShrink={0}>
          {toDate(updatedAt)}
        </Text>
        <Flex flex="1 1 auto" flexWrap="wrap" sx={{ gap: '.5rem' }}>
          {categories &&
            categories.map((category) => (
              <CategoryLinkButton
                key={category.id}
                userName={userName}
                categoryName={category.name}
              >
                {category.name}
              </CategoryLinkButton>
            ))}
        </Flex>
        <Flex flexShrink={0} alignItems="center">
          {userName && (
            <FavoriteButton
              postId={data.id}
              userName={userName}
              favorited={data.favorited || false}
              favoritesCount={data.favoritesCount || 0}
              w={8}
              h={8}
              onFavorite={onFavorite}
              onUnFavorite={onUnFavorite}
            />
          )}
        </Flex>
      </Flex>
      <Divider />
      <Box mt={2}>
        <Text color="textMain" whiteSpace="pre-wrap" fontSize="lg">
          {body}
        </Text>
      </Box>
    </Panel>
  );
};

export const PostPage = memo(PostPageComponent);
