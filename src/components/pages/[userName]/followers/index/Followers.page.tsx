import { Flex, Text } from '@chakra-ui/layout';
import { Grid } from '@chakra-ui/react';
import React, { FC } from 'react';

import { UserCardWithFollowButton } from '@/components/domain/user/UserCardWithFollowButton';
import { NoResource } from '@/components/layouts/NoResource';
import { Error } from '@/components/pages/error/Error';
import { Loading } from '@/components/ui/Loading';
import { useFollowers } from '@/repositories/users';

type Props = {
  userName?: string;
};
export const FollowersPage: FC<Props> = ({ userName }) => {
  const { data: followers, error } = useFollowers(userName);

  if (error) return <Error error={error.serialize()} />;
  return (
    <Flex flexDirection="column" sx={{ gap: '1rem' }}>
      <Text variant="pageTitle">フォロワー</Text>
      {followers ? (
        followers.length === 0 ? (
          <NoResource resourceName="フォロワー" saffix="いません。" />
        ) : (
          <Grid
            templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
            gap={4}
          >
            {followers.map((follower) => (
              <UserCardWithFollowButton
                key={follower.userName}
                user={follower}
              />
            ))}
          </Grid>
        )
      ) : (
        <Loading />
      )}
    </Flex>
  );
};
