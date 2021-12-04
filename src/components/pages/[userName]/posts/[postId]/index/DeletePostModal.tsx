import { Text } from '@chakra-ui/layout';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal';
import { useRouter } from 'next/router';
import React, { FC } from 'react';

import { Button } from '@/components/ui/Button';
import { toast } from '@/lib/chakraUI/theme';
import { postsRepository } from '@/repositories/posts';
import { Post } from '@/types/domains/post';
import { User } from '@/types/domains/user';
import { getPath } from '@/utils/route/Link';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  postId: Post['id'];
  myUserName: User['userName'];
};
export const DeletePostModal: FC<Props> = ({
  isOpen,
  onClose,
  postId,
  myUserName,
}) => {
  const router = useRouter();
  const handleClick = async () => {
    try {
      const result = await postsRepository.deletePost(postId, myUserName);
    } catch (e) {
      toast({ status: 'error', title: '投稿の削除に失敗しました。' });
    }
    router.push(
      getPath({ path: '/users/[userName]', params: { userName: myUserName } })
    );
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>投稿を削除する</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>投稿を削除してもよろしいですか？</Text>
        </ModalBody>
        <ModalFooter display="flex" sx={{ gap: '0.5rem' }}>
          <Button onClick={onClose} colorScheme="gray" variant="outline">
            キャンセル
          </Button>
          <Button colorScheme="red" onClick={handleClick}>
            削除する
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
