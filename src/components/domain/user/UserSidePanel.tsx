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

type ComponentProps = {
  user?: User;
  shuoldShowFollowButton?: boolean;
  isFollowing?: boolean;
  panelProps?: BoxProps;
};
const Component: FC<ComponentProps> = memo(
  ({ user, shuoldShowFollowButton = false, panelProps }) => {
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
            {user ? (
              <>
                <Avatar src={user.avatarUrl} name={user.userName} />
                <Flex flexDirection="column" overflow="hidden">
                  <Text fontSize="md" fontWeight="bold">
                    {user.displayName}
                  </Text>
                  <Text variant="secondary" fontSize="md">
                    @{user.userName}
                  </Text>
                </Flex>
              </>
            ) : (
              <Loading />
            )}
          </Flex>
          {shuoldShowFollowButton && user && (
            <FollowButton
              isFollowing={user.isFollowing ?? false}
              userName={user.userName}
              userId={user.id}
              width={{ base: undefined, lg: 'full' }}
            />
          )}
        </Flex>

        <Divider
          my={0}
          borderColor="gray.300"
          display={{ base: 'none', lg: 'flex' }}
        />
        {user && (
          <UserSidePanelTabs
            display={{ base: 'none', lg: 'flex' }}
            userName={user.userName}
          />
        )}
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

  return (
    <Component
      user={user ?? undefined}
      shuoldShowFollowButton={shuoldShowFollowButton}
      panelProps={panelProps}
    />
  );
};
