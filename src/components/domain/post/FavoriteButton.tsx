import Icon, { IconProps } from '@chakra-ui/icon';
import { Flex } from '@chakra-ui/layout';
import { Link as ChakraLink } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';

import { toast } from '@/lib/chakraUI/theme';
import { postsRepository } from '@/repositories/posts';
import { useAuth } from '@/services/auth/AuthProvider';
import { Paths } from '@/utils/route/paths';
import { HttpError } from '@/utils/types/error';

type Props = IconProps & {
  favorited: boolean;
  favoritesCount: number;
  userName: string;
  postId: string;
};

export const FavoriteButton: FC<Props> = ({
  favorited: initialFavorited,
  favoritesCount: initialFavoritesCount,
  userName,
  postId,
  ...props
}) => {
  const router = useRouter();
  const { me } = useAuth();
  const [favorited, setFavorited] = useState(initialFavorited);
  const [favoritesCount, setFavoritesCount] = useState(initialFavoritesCount);
  const rerendered = useRef(false);
  useEffect(() => {
    if (rerendered.current) {
      setFavorited(initialFavorited);
    } else {
      rerendered.current = true;
    }
  }, [initialFavorited]);
  useEffect(() => {
    if (rerendered.current) {
      setFavoritesCount(initialFavoritesCount);
    } else {
      rerendered.current = true;
    }
  }, [initialFavoritesCount]);

  const onClickFavorite = useCallback(
    async (e: React.MouseEvent<HTMLOrSVGElement, MouseEvent>) => {
      e.preventDefault();
      if (!me) {
        router.push({ pathname: Paths.login });
        return;
      }
      try {
        if (favorited) {
          await postsRepository.unFavorite(postId);
          setFavorited(false);
          setFavoritesCount((prev) => (prev -= 1));
          toast({ title: 'お気に入りを解除しました.', status: 'success' });
        } else {
          await postsRepository.favorite(postId);
          setFavorited(true);
          setFavoritesCount((prev) => (prev += 1));
          toast({ title: 'お気に入りしました.', status: 'success' });
        }
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
    [favorited, postId, me]
  );
  return (
    <Flex alignItems="center">
      {favorited ? (
        <Icon
          aria-label="favorite"
          as={AiFillStar}
          color="yellow.400"
          _hover={{ color: 'yellow.500' }}
          transition="ease"
          transitionDuration="300"
          w={7}
          h={7}
          borderRadius="full"
          cursor="pointer"
          onClick={onClickFavorite}
          {...props}
        />
      ) : (
        <Icon
          aria-label="favorite"
          as={AiOutlineStar}
          color="gray.300"
          _hover={{ color: 'yellow.400' }}
          transition="ease"
          transitionDuration="300"
          w={7}
          h={7}
          borderRadius="full"
          cursor="pointer"
          onClick={onClickFavorite}
          {...props}
        />
      )}
      {/* TODO: as使うパターン想定してなかったのでラップしたLinkじゃなくNextのLinkそのまま使っとく */}
      <NextLink
        as={`/${userName}/posts/${postId}/favorites`}
        href={`${router.pathname}/?favoritesModal=true&userName=${userName}&postId=${postId}`}
      >
        <ChakraLink
          px="1"
          fontSize="lg"
          onClick={() => (document.activeElement as HTMLElement).blur()}
          _hover={{ textDecoration: 'underline' }}
        >
          {favoritesCount}
        </ChakraLink>
      </NextLink>
    </Flex>
  );
};
