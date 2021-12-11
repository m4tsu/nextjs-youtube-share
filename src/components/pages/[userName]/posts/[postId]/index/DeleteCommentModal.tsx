import { Text } from '@chakra-ui/layout';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/modal';
import { FC } from 'react';

import { Button } from '@/components/ui/Button';
import { toast } from '@/lib/chakraUI/theme';
import { commentsRepository } from '@/repositories/comment';
import { Comment } from '@/types/domains/comment';
import { Post } from '@/types/domains/post';
import { User } from '@/types/domains/user';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  postId: Post['id'];
  userName: User['userName'];
  commentId: Comment['id'];
};
export const DeleteCommentModal: FC<Props> = ({
  isOpen,
  onClose,
  postId,
  userName,
  commentId,
}) => {
  const handleClick = async () => {
    try {
      await commentsRepository.deleteComment(userName, postId, commentId);
      toast({ status: 'success', title: 'コメントを削除しました。' });
    } catch (e) {
      toast({ status: 'error', title: 'コメントの削除に失敗しました。' });
    }
    onClose();
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>コメントを削除する</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>このコメントを削除してもよろしいですか？</Text>
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
