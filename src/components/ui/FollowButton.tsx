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
import { useRouter } from 'next/router';
import { FC, MouseEventHandler, useEffect, useRef, useState } from 'react';

import { toast } from '@/lib/chakraUI/theme';
import { usersRepository } from '@/repositories/users';
import { useAuth } from '@/services/auth/AuthProvider';
import { getPath } from '@/utils/route/Link';
import { HttpError } from '@/utils/types/error';
import { useHover } from '@/utils/useHover';

import { Button } from './Button';

const FollowingButton: FC<ButtonProps> = (props) => {
  const { ref, isHovered } = useHover<HTMLButtonElement>();
  return (
    <Button
      ref={ref}
      colorScheme={isHovered ? 'red' : 'primary'}
      flexShrink={0}
      variant="outline"
      width="130px"
      {...props}
    >
      {isHovered ? 'フォロー解除' : 'フォロー中'}
    </Button>
  );
};

type FollowButtonProps = {
  isFollowing: boolean;
  onClick?: () => void;
  userName: string;
  userId: string;
} & ButtonProps;
export const FollowButton: FC<FollowButtonProps> = ({
  isFollowing: initialIsFollowing,
  onClick,
  userName,
  userId,
  ...props
}) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const router = useRouter();
  const { me } = useAuth();
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);

  const rerendered = useRef(false);
  useEffect(() => {
    if (rerendered.current) {
      setIsFollowing(initialIsFollowing);
    } else {
      rerendered.current = true;
    }
  }, [initialIsFollowing]);

  const follow = async () => {
    if (!userName) return;
    if (!me) {
      router.push(getPath({ path: '/login' }));
      return;
    }
    try {
      await usersRepository.follow(userId);
      setIsFollowing(true);
      toast({ title: 'フォローしました', status: 'success' });
    } catch (e) {
      if (e instanceof HttpError) {
        toast({ title: 'ログインしてください.', status: 'error' });
        router.push(getPath({ path: '/login' }));
        return;
      }
      throw e;
    }
  };

  const unfollow = async () => {
    if (!userName) return;
    if (!me) {
      router.push(getPath({ path: '/login' }));
      return;
    }
    try {
      await usersRepository.unFollow(userId);
      setIsFollowing(false);
      toast({ title: 'フォロー解除しました', status: 'success' });
    } catch (e) {
      if (e instanceof HttpError) {
        toast({ title: 'ログインしてください.', status: 'error' });
        router.push(getPath({ path: '/login' }));
        return;
      }
      throw e;
    }

    onClick && onClick();
    onClose();
  };

  const handleOpen: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    onOpen();
  };

  const handleClickFollow: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    await follow();
    onClick && onClick();
  };

  return (
    <>
      {isFollowing ? (
        <FollowingButton {...props} onClick={handleOpen} />
      ) : (
        <Button
          colorScheme="primary"
          flexShrink={0}
          onClick={handleClickFollow}
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
  );
};
