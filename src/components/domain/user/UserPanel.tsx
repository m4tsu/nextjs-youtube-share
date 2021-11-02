import { Image } from '@chakra-ui/image';
import { Box, Flex, Text } from '@chakra-ui/layout';
import { useRouter } from 'next/router';
import React, { FC, memo } from 'react';

import { Button } from '@/components/ui/Button';
import { Loading } from '@/components/ui/Loading';
import { Panel } from '@/components/ui/Panel';
import { useUser } from '@/repositories/users';
import { User } from '@/types/domains/user';

import { NoResourceError } from '../../pages/error/NoResourceError';

import { UserPanelTab } from './UserPanelTab';

type ComponentProps = Pick<User, 'userName' | 'avatarUrl' | 'displayName'> & {
  currentPathName: string;
};
const Component: FC<ComponentProps> = memo(
  ({ userName, avatarUrl, displayName, currentPathName }) => {
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
            <Button colorScheme="primary">フォロー</Button>
          </Flex>
        </Flex>
        <UserPanelTab userName={userName} currentPathName={currentPathName} />
      </Panel>
    );
  }
);

export const UserPanel: FC = () => {
  const router = useRouter();
  const currentPathName = router.pathname;
  const userName = router.query.userName as string;
  console.log(currentPathName);
  const { data, error } = useUser(userName);
  console.log('useUser data', data);
  if (error) return <NoResourceError resourceName="ユーザー" />;
  if (!data) return <Loading />;
  return <Component {...data} currentPathName={currentPathName} />;
};
