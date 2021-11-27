import { Flex, Text, VStack } from '@chakra-ui/layout';
import React, { FC } from 'react';

import { UserCardWithFollowButton } from '@/components/domain/user/UserCardWithFollowButton';
import { Error } from '@/components/pages/error/Error';
import { Loading } from '@/components/ui/Loading';
import { useFollowings } from '@/repositories/users';

type Props = {
  userName?: string;
};
export const FollowingPage: FC<Props> = ({ userName }) => {
  const { data: followings, error } = useFollowings(userName);

  if (error) return <Error error={error.serialize()} />;
  if (!followings) return <Loading />;
  return (
    <Flex flexDirection="column" sx={{ gap: '1rem' }}>
      <Text variant="pageTitle">フォロー中</Text>
      <VStack gap={4}>
        {followings.map((following) => (
          <UserCardWithFollowButton key={following.userName} user={following} />
        ))}
      </VStack>
    </Flex>
  );
};
