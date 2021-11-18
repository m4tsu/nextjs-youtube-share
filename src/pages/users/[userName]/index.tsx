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
import { PostsPage } from '@/components/pages/[userName]/index/Posts.page';
import { FavoritesPage } from '@/components/pages/[userName]/posts/[postId]/favorites/Favorites.page';
import { getPath } from '@/utils/route/Link';

const querySchema = z.object({
  userName: z.string().optional(),
  category: z.string().optional(),
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
  const { userName, page, favoritesModal, postId, category } =
    querySchema.parse(router.query);

  const handleCloseModal = useCallback(() => {
    const query: { page?: number; category?: string } = {};
    if (!userName) return;
    if (page) query['page'] = page;
    if (category) query['category'] = category;
    router.push(
      {
        pathname: getPath({ path: '/users/[userName]', params: { userName } }),
        query,
      },
      undefined,
      {
        shallow: true,
      }
    );
  }, [router, userName, page, category]);

  return (
    <>
      <PostsPage userName={userName} page={page ?? 1} categoryName={category} />
      <Modal isOpen={!!favoritesModal} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent mt={{ base: 40, lg: 20 }}>
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
