import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/modal';
import { ModalHeader } from '@chakra-ui/react';
import { NextAppPage } from 'next';
import { useRouter } from 'next/router';
import React, { useCallback } from 'react';
import { z } from 'zod';

import { UserPageLayout } from '@/components/layouts/UserPage/UserPageLayout';
import { PostsPage } from '@/components/pages/[userName]/Index/Posts.page';
import { FavoritesPage } from '@/components/pages/[userName]/posts/[postId]/favorites/Favorites.page';

const querySchema = z.object({
  userName: z.string().optional(),
  page: z
    .string()
    .optional()
    .refine((v) => {
      return v ? !isNaN(Number(v)) : true;
    }, 'limit: unexpected type')
    .transform((v) => (v ? Number(v) : undefined)),
  favoritesModal: z.string().optional(), // TODO: こちら側に定義しなきゃいけないのなんか嫌だけど他のやり方思いつかない
  postId: z.string().optional(),
});
const Page: NextAppPage = () => {
  const router = useRouter();
  const { userName, page, favoritesModal, postId } = querySchema.parse(
    router.query
  );
  const handleCloseModal = useCallback(() => {
    router.push(`/${userName}`, undefined, { shallow: true });
  }, [router, userName]);

  return (
    <>
      <PostsPage userName={userName} page={page ?? 1} />
      <Modal isOpen={!!favoritesModal} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>この投稿をお気に入りしたユーザー</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FavoritesPage postId={postId} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

Page.getLayout = (page) => <UserPageLayout>{page}</UserPageLayout>;

export default Page;
