import { Image } from '@chakra-ui/image';
import { Box, Flex, Text } from '@chakra-ui/layout';
import { useRouter } from 'next/router';
import React, { FC, memo, useCallback } from 'react';

import { FollowButton } from '@/components/ui/FollowButton';
import { Loading } from '@/components/ui/Loading';
import { Panel } from '@/components/ui/Panel';
import { toast } from '@/lib/chakraUI/theme';
import { usersRepository, useUser } from '@/repositories/users';
import { useAuth } from '@/services/auth/AuthProvider';
import { User } from '@/types/domains/user';
import { getPath } from '@/utils/route/Link';
import { Paths } from '@/utils/route/paths';
import { HttpError } from '@/utils/types/error';

import { NoResourceError } from '../../pages/error/NoResourceError';

import { UserPanelTab } from './UserPanelTab';

type ComponentProps = Pick<User, 'userName' | 'avatarUrl' | 'displayName'> & {
  currentPathName: string;
  isFollowing?: boolean;
  onFollowButtonClick: () => void;
};
const Component: FC<ComponentProps> = memo(
  ({
    userName,
    avatarUrl,
    displayName,
    currentPathName,
    onFollowButtonClick,
    isFollowing,
  }) => {
    return (
      <Panel display="flex" flexDirection="column" sx={{ gap: '0.5rem' }}>
        <Flex alignItems="center" justifyContent="space-between">
          <Flex alignItems="center" justifyContent="space-between">
            <Image
              // src={user.avatarUrl}
              src={avatarUrl}
              borderRadius="full"
              display="block"
              width="50px"
              height="50px"
            />
            <Box ml={4}>
              <Text color="textMain" fontSize="lg" fontWeight="bold" my={1}>
                {/* {user.displayName} */}
                {displayName}
              </Text>
              <Text color="textSub" fontSize="md" my={1}>
                {/* {user.userName} */}
                {userName}
              </Text>
            </Box>
          </Flex>
          <Flex alignItems="center">
            <FollowButton
              isFollowing={isFollowing || false}
              onClick={onFollowButtonClick}
              userName={userName}
            />
          </Flex>
        </Flex>
        <UserPanelTab userName={userName} currentPathName={currentPathName} />
      </Panel>
    );
  }
);

export const UserPanel: FC = () => {
  const router = useRouter();
  const { me } = useAuth();
  const currentPathName = router.pathname;
  const userName = router.query.userName as string;
  const { data, error, mutate } = useUser(userName);
  const onFollowButtonClick = useCallback(async () => {
    if (!data) return;
    if (!me) {
      router.push({ pathname: Paths.login });
      return;
    }
    try {
      if (data.isFollowing) {
        const res = await usersRepository.unFollow(data.id);
        toast({ title: 'フォロー解除しました', status: 'success' });
        await mutate({ ...data, isFollowing: false });
      } else {
        const res = await usersRepository.follow(data.id);
        toast({ title: 'フォローしました', status: 'success' });
        await mutate({ ...data, isFollowing: true });
      }
    } catch (e) {
      if (e instanceof HttpError) {
        toast({ title: 'ログインしてください.', status: 'error' });
        router.push(getPath({ path: '/login' }));
        return;
      }
      throw e;
    }
  }, [data, mutate, router]);

  if (error) return <NoResourceError resourceName="ユーザー" />;
  if (!data) return <Loading />;

  return (
    <Component
      {...data}
      currentPathName={currentPathName}
      onFollowButtonClick={onFollowButtonClick}
    />
  );
};
