import {
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
} from '@chakra-ui/modal';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { z } from 'zod';

import { FavoritesPage } from '@/components/pages/[userName]/posts/[postId]/favorites/Favorites.page';

const querySchema = z.object({
  postId: z.string().optional(),
});
export const FavoritesPageModalContent: FC = () => {
  const router = useRouter();
  const { postId } = querySchema.parse(router.query);
  return (
    <ModalContent mt={{ base: 40, lg: 20 }}>
      <ModalHeader>この投稿をお気に入りしたユーザー</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <FavoritesPage postId={postId} />
      </ModalBody>
    </ModalContent>
  );
};
