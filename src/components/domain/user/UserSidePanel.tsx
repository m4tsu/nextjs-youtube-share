import { Avatar } from '@chakra-ui/avatar';
import { Box, BoxProps, Flex, Text } from '@chakra-ui/layout';
import { Divider, useColorModeValue } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { FC, memo, useCallback } from 'react';

import { NoResourceError } from '@/components/pages/error/NoResourceError';
import { FollowButton } from '@/components/ui/FollowButton';
import { Loading } from '@/components/ui/Loading';
import { Panel } from '@/components/ui/Panel';
import { toast } from '@/lib/chakraUI/theme';
import { usersRepository, useUser } from '@/repositories/users';
import { useAuth } from '@/services/auth/AuthProvider';
import { User } from '@/types/domains/user';
import { getPath } from '@/utils/route/Link';
import { HttpError } from '@/utils/types/error';

import { UserSidePanelTabs } from './UserSidePanelTabs';

type ComponentProps = Pick<User, 'userName' | 'avatarUrl' | 'displayName'> & {
  currentPathName: string;
  isMe?: boolean;
  isFollowing?: boolean;
  onFollowButtonClick: () => void;
  panelProps?: BoxProps;
};
const Component: FC<ComponentProps> = memo(
  ({
    currentPathName,
    isMe,
    userName,
    avatarUrl,
    displayName,
    isFollowing,
    onFollowButtonClick,
    panelProps,
  }) => (
    <Panel
      display="flex"
      flexDirection="column"
      // borderWidth="thin"
      variant="rounded"
      sx={{ gap: '1rem' }}
      {...panelProps}
    >
      <Flex
        flexDirection={{ base: 'row', lg: 'column' }}
        sx={{ gap: '1rem' }}
        justifyContent={{ base: 'space-between', lg: 'center' }}
        alignItems={{ base: 'center', lg: 'unset' }}
      >
        <Flex
          sx={{ gap: '.5rem' }}
          alignItems="center"
          // justifyContent="space-between"
        >
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
          <Box>
            <FollowButton
              isFollowing={isFollowing ?? false}
              onClick={onFollowButtonClick}
              userName={userName}
              width="full"
            />
          </Box>
        )}
      </Flex>

      <Divider
        my={0}
        borderColor="darkPrimary.400"
        display={{ base: 'none', lg: 'flex' }}
      />
      <UserSidePanelTabs
        display={{ base: 'none', lg: 'flex' }}
        userName={userName}
        currentPathName={currentPathName}
      />
    </Panel>
  )
);

export const UserSidePanel: FC<{ panelProps?: BoxProps }> = ({
  panelProps,
}) => {
  const router = useRouter();
  const bg = useColorModeValue('white', 'darkPrimary.600');
  const { me } = useAuth();
  const currentPathName = router.pathname;
  const userName = router.query.userName as string;
  const { data: user, error, mutate } = useUser(userName);

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

  console.log(me, user);
  return (
    <Component
      {...user}
      isMe={isMe}
      currentPathName={currentPathName}
      onFollowButtonClick={onFollowButtonClick}
      panelProps={{ ...panelProps, bg }}
    />
  );
};
