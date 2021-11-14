import { Box, Text } from '@chakra-ui/layout';
import { Avatar, Spacer } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FC, useCallback } from 'react';

import { Card } from '@/components/ui/Card';
import { FollowButton } from '@/components/ui/FollowButton';
import { toast } from '@/lib/chakraUI/theme';
import { usersRepository } from '@/repositories/users';
import { useAuth } from '@/services/auth/AuthProvider';
import { User } from '@/types/domains/user';
import { Link } from '@/utils/route/Link';
import { Paths } from '@/utils/route/paths';
import { HttpError } from '@/utils/types/error';

type Props = {
  user: User;
};
export const UserCard: FC<Props> = ({ user }) => {
  const { me } = useAuth();
  const router = useRouter();
  const onFollowButtonClick = useCallback(async () => {
    if (!me) {
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
    <Card
      asLinkBox
      sx={{ gap: '0.5rem' }}
      display="flex"
      alignItems="center"
      p={2}
      width="full"
      maxWidth="500px"
    >
      <Avatar src={user.avatarUrl} name={user.displayName} />
      <Box overflow="hidden">
        <Text
          fontSize="lg"
          fontWeight="bold"
          overflow="hidden"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
          my={1}
        >
          <Link
            path="/[userName]"
            params={{ userName: user.userName }}
            asOverLay
          >
            {user.displayName}
          </Link>
        </Text>
        <Text
          variant="secondary"
          fontSize="md"
          overflow="hidden"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
          my={1}
        >
          {user.userName}
        </Text>
      </Box>
      <Spacer />
      <FollowButton
        flexShrink={0}
        onClick={onFollowButtonClick}
        isFollowing={user.isFollowing ?? false}
        userName={user.userName}
      />
    </Card>
  );
};
