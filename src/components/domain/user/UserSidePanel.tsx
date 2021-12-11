import { Avatar } from '@chakra-ui/avatar';
import { BoxProps, Flex, Text } from '@chakra-ui/layout';
import { Divider, useColorModeValue } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { FC, memo } from 'react';
import { z } from 'zod';

import { Error } from '@/components/pages/error/Error';
import { FollowButton } from '@/components/ui/FollowButton';
import { Loading } from '@/components/ui/Loading';
import { Panel } from '@/components/ui/Panel';
import { useUser } from '@/repositories/users';
import { useAuth } from '@/services/auth/AuthProvider';
import { User } from '@/types/domains/user';
import { Paths } from '@/utils/route/paths';

import { UserSidePanelTabs } from './UserSidePanelTabs';

type ComponentProps = Pick<
  User,
  'userName' | 'avatarUrl' | 'displayName' | 'id'
> & {
  shuoldShowFollowButton?: boolean;
  isFollowing?: boolean;
  panelProps?: BoxProps;
};
const Component: FC<ComponentProps> = memo(
  ({
    id,
    userName,
    avatarUrl,
    displayName,
    isFollowing,
    shuoldShowFollowButton = false,
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
          {shuoldShowFollowButton && (
            <FollowButton
              isFollowing={isFollowing ?? false}
              userName={userName}
              userId={id}
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
          display={{ base: 'none', lg: 'flex' }}
          userName={userName}
        />
      </Panel>
    );
  }
);

const querySchema = z.object({ userName: z.string().optional() });
export const UserSidePanel: FC<{ panelProps?: BoxProps }> = ({
  panelProps,
}) => {
  const router = useRouter();
  const { me, isLoading } = useAuth();
  const isMyHomePage = router.pathname === Paths.home;
  const { userName } = querySchema.parse(router.query);
  const isMe = isMyHomePage ? true : me?.userName === userName;
  const shuoldShowFollowButton = isLoading ? false : me ? !isMe : true;
  const { data, error } = useUser(isMe ? undefined : userName);
  const user = isMyHomePage ? me : isMe ? me : data;

  if (error) return <Error error={error.serialize()} />;
  if (!user) return <Loading />;

  return (
    <Component
      userName={user.userName}
      id={user.id}
      avatarUrl={user.avatarUrl}
      displayName={user.displayName}
      isFollowing={user.isFollowing}
      shuoldShowFollowButton={shuoldShowFollowButton}
      panelProps={panelProps}
    />
  );
};
