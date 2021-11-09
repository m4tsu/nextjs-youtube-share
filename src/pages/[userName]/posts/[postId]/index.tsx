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
import { z } from 'zod';

import { UserPageLayout } from '@/components/layouts/UserPage/UserPageLayout';
import { FavoritesPage } from '@/components/pages/[userName]/posts/[postId]/favorites/Favorites.page';
import { PostPage } from '@/components/pages/[userName]/posts/[postId]/index/Post.page';

const querySchema = z.object({
  userName: z.string().optional(),
  postId: z.string().optional(),
  favoritesModal: z.string().optional(), // TODO: こちら側に定義しなきゃいけないのなんか嫌だけど他のやり方思いつかない
});
const Page: NextAppPage = () => {
  const router = useRouter();
  const { userName, postId, favoritesModal } = querySchema.parse(router.query);
  return (
    <>
      <PostPage postId={postId} userName={userName} />
      <Modal isOpen={!!favoritesModal} onClose={router.back}>
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
