import { ButtonProps } from '@chakra-ui/button';
import { useDisclosure } from '@chakra-ui/hooks';
import {
  Modal,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
} from '@chakra-ui/modal';
import { Portal } from '@chakra-ui/portal';
import { FC, MouseEventHandler } from 'react';

import { useHover } from '@/utils/useHover';

import { Button } from './Button';

type FollowButtonProps = {
  isFollowing: boolean;
  onClick?: () => void;
  userName: string;
} & ButtonProps;
export const FollowButton: FC<FollowButtonProps> = ({
  isFollowing,
  onClick,
  userName,
  ...props
}) => {
  const { ref, isHovered } = useHover<HTMLButtonElement>();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const unfollow = () => {
    if (onClick) {
      onClick();
    }
    onClose();
  };

  const handleOpen: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    onOpen();
  };

  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    onClick && onClick();
  };

  return (
    // <Box ref={ref} flexShrink={0}>
    <>
      {isFollowing ? (
        <Button
          ref={ref}
          colorScheme={isHovered ? 'red' : 'primary'}
          flexShrink={0}
          variant="outline"
          onClick={handleOpen}
          width="130px"
          {...props}
        >
          {isHovered ? 'フォロー解除' : 'フォロー中'}
        </Button>
      ) : (
        <Button
          ref={ref}
          colorScheme="primary"
          flexShrink={0}
          onClick={handleClick}
          {...props}
        >
          フォロー
        </Button>
      )}
      <Portal>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{userName}さんをフォロー解除しますか？</ModalHeader>
            <ModalCloseButton />
            <ModalFooter flexDirection="column" sx={{ gap: '1rem' }}>
              <Button
                colorScheme="red"
                variant="outline"
                width="full"
                onClick={unfollow}
              >
                フォロー解除する
              </Button>
              <Button
                colorScheme="primary"
                variant="outline"
                width="full"
                onClick={onClose}
              >
                キャンセル
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Portal>
    </>
    // </Box>
  );
};
