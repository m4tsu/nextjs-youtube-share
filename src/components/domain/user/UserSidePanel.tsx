import { Avatar } from '@chakra-ui/avatar';
import { BoxProps, Flex, Text } from '@chakra-ui/layout';
import { Divider, useColorModeValue } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { FC, useCallback } from 'react';
import { z } from 'zod';

import { NoResourceError } from '@/components/pages/error/NoResourceError';
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

import { UserSidePanelTabs } from './UserSidePanelTabs';

type ComponentProps = Pick<User, 'userName' | 'avatarUrl' | 'displayName'> & {
  currentPathName: string;
  isMe?: boolean;
  isFollowing?: boolean;
  onFollowButtonClick: () => void;
  panelProps?: BoxProps;
};
const Component: FC<ComponentProps> = ({
  currentPathName,
  isMe,
  userName,
  avatarUrl,
  displayName,
  isFollowing,
  onFollowButtonClick,
  panelProps,
}) => {
  const bg = useColorModeValue('white', 'darkPrimary.600');

  return (
    <Panel
      display="flex"
      flexDirection="column"
      variant="rounded"
      sx={{ gap: '1rem' }}
      bg={bg}
      {...panelProps}
    >
      <Flex
        flexDirection={{ base: 'row', lg: 'column' }}
        sx={{ gap: '1rem' }}
        justifyContent={{ base: 'space-between', lg: 'center' }}
        alignItems={{ base: 'center', lg: 'unset' }}
      >
        <Flex sx={{ gap: '.5rem' }} alignItems="center">
          <Avatar src={avatarUrl} name={userName} />
          <Flex flexDirection="column" overflow="hidden">
            <Text fontSize="md" fontWeight="bold">
              {displayName}
            </Text>
            <Text variant="secondary" fontSize="md">
              @{userName}
            </Text>
          </Flex>
        </Flex>
        {!isMe && (
          <FollowButton
            isFollowing={isFollowing ?? false}
            onClick={onFollowButtonClick}
            userName={userName}
            width={{ base: undefined, lg: 'full' }}
          />
        )}
      </Flex>

      <Divider
        my={0}
        borderColor="gray.300"
        display={{ base: 'none', lg: 'flex' }}
      />
      <UserSidePanelTabs
        isMe={isMe}
        display={{ base: 'none', lg: 'flex' }}
        userName={userName}
        currentPathName={currentPathName}
      />
    </Panel>
  );
};

const querySchema = z.object({ userName: z.string().optional() });
export const UserSidePanel: FC<{ panelProps?: BoxProps }> = ({
  panelProps,
}) => {
  const router = useRouter();
  const { me } = useAuth();
  const currentPathName = router.pathname;
  const isMyHomePage = currentPathName === Paths.home;
  const { userName } = querySchema.parse(router.query);
  const {
    data: user,
    error,
    mutate,
  } = useUser(isMyHomePage ? me?.userName : userName);

  const onFollowButtonClick = useCallback(async () => {
    if (!user) return;
    if (!me) {
      router.push(getPath({ path: '/login' }));
      return;
    }
    try {
      if (user.isFollowing) {
        const res = await usersRepository.unFollow(user.id);
        toast({ title: 'フォロー解除しました', status: 'success' });
        await mutate({ ...user, isFollowing: false });
      } else {
        const res = await usersRepository.follow(user.id);
        toast({ title: 'フォローしました', status: 'success' });
        await mutate({ ...user, isFollowing: true });
      }
    } catch (e) {
      if (e instanceof HttpError) {
        toast({ title: 'ログインしてください.', status: 'error' });
        router.push(getPath({ path: '/login' }));
        return;
      }
      throw e;
    }
  }, [user, mutate, router, me]);

  if (error) return <NoResourceError resourceName="ユーザー" />;
  if (!user) return <Loading />;

  const isMe = me ? me.userName === user.userName : false;
  return (
    <Component
      {...user}
      isMe={isMe}
      currentPathName={currentPathName}
      onFollowButtonClick={onFollowButtonClick}
      panelProps={panelProps}
    />
  );
};
