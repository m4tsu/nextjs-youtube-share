import { useRouter } from 'next/router';
import React, { FC, useCallback } from 'react';

import { UserCard } from '@/components/domain/user/UserCard';
import { FollowButton } from '@/components/ui/FollowButton';
import { toast } from '@/lib/chakraUI/theme';
import { usersRepository } from '@/repositories/users';
import { useAuth } from '@/services/auth/AuthProvider';
import { User } from '@/types/domains/user';
import { Paths } from '@/utils/route/paths';
import { HttpError } from '@/utils/types/error';

type Props = {
  user: User;
};
export const UserCardWithFollowButton: FC<Props> = ({ user }) => {
  const { me } = useAuth();
  const router = useRouter();
  const isMe = me ? me.userName === user.userName : false;
  const onFollowButtonClick = useCallback(async () => {
    if (!me) {
      toast({ title: 'ログインしてください.', status: 'info' });
      router.push({ pathname: Paths.login });
      return;
    }
    try {
      if (user.isFollowing) {
        const res = await usersRepository.unFollow(user.id);
        toast({ title: 'フォロー解除しました', status: 'success' });
        // await mutate({ ...data, isFollowing: false });
      } else {
        const res = await usersRepository.follow(user.id);
        toast({ title: 'フォローしました', status: 'success' });
        // await mutate({ ...data, isFollowing: true });
      }
    } catch (e) {
      if (e instanceof HttpError) {
        toast({ title: 'ログインしてください.', status: 'error' });
        router.push({ pathname: Paths.login });
        return;
      }
      throw e;
    }
  }, [router, me, user]);
  return (
    <UserCard user={user}>
      {!isMe && (
        <FollowButton
          // flexShrink={0}
          onClick={onFollowButtonClick}
          isFollowing={user.isFollowing ?? false}
          userName={user.userName}
        />
      )}
    </UserCard>
  );
};
