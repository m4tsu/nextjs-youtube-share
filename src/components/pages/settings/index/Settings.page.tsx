import { Avatar } from '@chakra-ui/avatar';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Flex, Text } from '@chakra-ui/layout';
import { FC } from 'react';

import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Loading } from '@/components/ui/Loading';
import { useAuth } from '@/services/auth/AuthProvider';
import { Link } from '@/utils/route/Link';

export const SettingsPage: FC = () => {
  const { me, isLoading } = useAuth();
  return (
    <Card
      width="full"
      maxWidth="600px"
      margin="0 auto"
      borderRadius="none"
      p="4"
      display="flex"
      flexDirection="column"
      boxShadow="none"
      _hover={{ boxShadow: 'none' }}
      sx={{ gap: '1rem' }}
    >
      <Text fontSize="xl">ユーザー設定</Text>

      {isLoading || !me ? (
        <Loading />
      ) : (
        <Flex flexDirection="column" sx={{ gap: '0.5rem' }}>
          <Flex justifyContent="center" p="4">
            <Avatar src={me.avatarUrl} name={me.displayName} boxSize="64px" />
          </Flex>
          <Flex flexDirection="column" sx={{ gap: '0.5rem' }}>
            <FormControl>
              <FormLabel htmlFor="userName">tubetterID</FormLabel>
              <Input name="userName" value={me.userName} disabled />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="displayName">ユーザー名</FormLabel>
              <Input name="displayName" value={me.displayName} disabled />
            </FormControl>
          </Flex>
        </Flex>
      )}
      <Text variant="secondary" fontSize="xs" mt="4" textAlign="center">
        <Link path="/settings/withdraw">退会する</Link>
      </Text>
    </Card>
  );
};
