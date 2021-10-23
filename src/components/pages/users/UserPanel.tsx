import { Button } from '@/components/common/Button';
import { Loading } from '@/components/common/Loading';
import { Panel } from '@/components/common/Panel';
import { User } from '@/models/user';
import { useUser } from '@/repositories/users';
import { Image } from '@chakra-ui/image';
import { Box, Flex, Text } from '@chakra-ui/layout';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { NoResourceError } from '../error/NoResourceError';
import { UserPanelTab } from './UserPanelTab';

type ComponentProps = {
  // user: User;
  user_name: User['user_name'];
  photo_url?: User['photo_url'];
  display_name?: User['display_name'];
  currentPathName: string;
};
const Component: FC<ComponentProps> = ({
  user_name,
  photo_url,
  display_name,
  currentPathName,
}) => {
  return (
    <Panel display="flex" flexDirection="column" sx={{ gap: '0.5rem' }}>
      <Flex alignItems="center" justifyContent="space-between">
        <Flex alignItems="center" justifyContent="space-between">
          <Image
            // src={user.photo_url}
            src={photo_url}
            borderRadius="full"
            display="block"
            width="50px"
            height="50px"
          />
          <Box ml={4}>
            <Text color="textMain" fontSize="lg" fontWeight="bold" my={1}>
              {/* {user.display_name} */}
              {display_name}
            </Text>
            <Text color="textSub" fontSize="md" my={1}>
              {/* {user.user_name} */}
              {user_name}
            </Text>
          </Box>
        </Flex>
        <Flex alignItems="center">
          <Button colorScheme="primary">フォロー</Button>
        </Flex>
      </Flex>
      <UserPanelTab user_name={user_name} currentPathName={currentPathName} />
    </Panel>
  );
};

export const UserPanel: FC = () => {
  const router = useRouter();
  const currentPathName = router.pathname;
  const user_name = router.query.user_name as string;
  console.log(currentPathName);
  const { data, error } = useUser(user_name);
  console.log('useUser data', data);
  if (error) return <NoResourceError resourceName="ユーザー" />;
  if (!data) return <Loading />;
  return <Component {...data} currentPathName={currentPathName} />;
};
