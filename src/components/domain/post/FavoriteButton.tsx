import Icon, { IconProps } from '@chakra-ui/icon';
import { Flex } from '@chakra-ui/layout';
import { Link as ChakraLink } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';

type Props = IconProps & {
  favorited: boolean;
  favoritesCount: number;
  userName: string;
  postId: string;
  onFavorite: (postId: string) => Promise<void>;
  onUnFavorite: (postId: string) => Promise<void>;
};

export const FavoriteButton: FC<Props> = ({
  favorited: initialFavorited,
  favoritesCount: initialFavoritesCount,
  userName,
  postId,
  onFavorite,
  onUnFavorite,
  ...props
}) => {
  const router = useRouter();
  console.log('route!!!!!!!', router);
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
      if (favorited) {
        await onUnFavorite(postId);
        setFavorited(false);
        setFavoritesCount((prev) => (prev -= 1));
      } else {
        await onFavorite(postId);
        setFavorited(true);
        setFavoritesCount((prev) => (prev += 1));
      }
    },
    [favorited, postId, onFavorite, onUnFavorite]
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
          w={6}
          h={6}
          borderRadius="full"
          cursor="pointer"
          onClick={onClickFavorite}
          {...props}
        />
      ) : (
        <Icon
          aria-label="favorite"
          as={AiOutlineStar}
          color="gray.400"
          _hover={{ color: 'yellow.400' }}
          transition="ease"
          transitionDuration="300"
          w={6}
          h={6}
          borderRadius="full"
          cursor="pointer"
          onClick={onClickFavorite}
          {...props}
        />
      )}
      {/* TODO: as使うパターン想定してなかったのでラップしたLinkじゃなくNextのLinkそのまま使っとく */}
      <NextLink
        as={`/${userName}/posts/${postId}/favorites`}
        href={{
          pathname: `${router.pathname}`,
          query: { ...router.query, favoritesModal: 'true', userName, postId },
        }}
        shallow
      >
        {/* <NextLink
        as={`/${userName}/posts/${postId}/favorites`}
        href={`${router.asPath}`}
      > */}
        <ChakraLink
          px="1"
          fontSize="lg"
          position="relative"
          onClick={() => (document.activeElement as HTMLElement).blur()}
          _hover={{ textDecoration: 'underline' }}
        >
          {favoritesCount}
        </ChakraLink>
      </NextLink>
    </Flex>
  );
};
