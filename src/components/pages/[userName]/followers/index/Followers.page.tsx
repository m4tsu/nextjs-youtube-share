import { Flex, Text, VStack } from '@chakra-ui/layout';
import React, { FC } from 'react';

import { UserCardWithFollowButton } from '@/components/domain/user/UserCardWithFollowButton';
import { Error } from '@/components/pages/error/Error';
import { Loading } from '@/components/ui/Loading';
import { useFollowers } from '@/repositories/users';

type Props = {
  userName?: string;
};
export const FollowersPage: FC<Props> = ({ userName }) => {
  const { data: followers, error } = useFollowers(userName);

  if (error) return <Error error={error.serialize()} />;
  if (!followers) return <Loading />;
  return (
    <Flex flexDirection="column" sx={{ gap: '1rem' }}>
      <Text variant="pageTitle">フォロワー</Text>
      <VStack gap={4}>
        {followers.map((follower) => (
          <UserCardWithFollowButton key={follower.userName} user={follower} />
        ))}
      </VStack>
    </Flex>
  );
};
