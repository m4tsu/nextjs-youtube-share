import { ButtonProps, IconButton } from '@chakra-ui/button';
import { StarIcon } from '@chakra-ui/icons';
import router from 'next/router';
import { FC, useCallback, useEffect, useState } from 'react';

import { toast } from '@/lib/chakraUI/theme';
import { postsRepository } from '@/repositories/posts';
import { Paths } from '@/utils/route/paths';
import { HttpError } from '@/utils/types/error';

type Props = ButtonProps & {
  favorited?: boolean;
  postId: string;
};
export const FavoriteButton: FC<Props> = ({
  favorited: initialFavorited,
  postId,
  ...props
}) => {
  // 本当はpostsのキャッシュ更新したいけど...
  const [favorited, setFavorited] = useState(initialFavorited);
  useEffect(() => {
    setFavorited(initialFavorited);
  }, [initialFavorited]);

  const onClickFavorite = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      try {
        if (favorited) {
          await postsRepository.unFavorite(postId);
          setFavorited(false);
          toast({ title: 'お気に入りを解除しました.', status: 'success' });
        } else {
          await postsRepository.favorite(postId);
          setFavorited(true);
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
    [favorited, postId]
  );
  return (
    <IconButton
      aria-label="favorite"
      fontSize="lg"
      color={favorited ? 'yellow.400' : 'gray.300'}
      backgroundColor="inherit"
      borderRadius="50%"
      onClick={onClickFavorite}
      icon={<StarIcon focusable />}
      {...props}
    />
  );
};
