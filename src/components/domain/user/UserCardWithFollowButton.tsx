import React, { FC } from 'react';

import { UserCard } from '@/components/domain/user/UserCard';
import { FollowButton } from '@/components/ui/FollowButton';
import { useAuth } from '@/services/auth/AuthProvider';
import { User } from '@/types/domains/user';

type Props = {
  user: User;
};
export const UserCardWithFollowButton: FC<Props> = ({ user }) => {
  const { me } = useAuth();
  const isMe = me ? me.userName === user.userName : false;

  return (
    <UserCard user={user}>
      {!isMe && (
        <FollowButton
          isFollowing={user.isFollowing ?? false}
          userName={user.userName}
          userId={user.id}
        />
      )}
    </UserCard>
  );
};
