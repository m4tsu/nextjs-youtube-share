import { Flex, Text } from '@chakra-ui/layout';
import { Grid } from '@chakra-ui/react';
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
      <Grid
        templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
        gap={4}
      >
        {followings.map((following) => (
          <UserCardWithFollowButton key={following.userName} user={following} />
        ))}
      </Grid>
    </Flex>
  );
};
