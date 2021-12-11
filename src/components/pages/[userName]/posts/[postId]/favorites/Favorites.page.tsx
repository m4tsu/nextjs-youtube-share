import { VStack } from '@chakra-ui/layout';
import { FC } from 'react';

import { UserCard } from '@/components/domain/user/UserCard';
import { Error } from '@/components/pages/error/Error';
import { Loading } from '@/components/ui/Loading';
import { usePostFavorites } from '@/repositories/posts';
import { User } from '@/types/domains/user';

type ComponentProps = {
  users: User[];
};
const Component: FC<ComponentProps> = ({ users }) => {
  return (
    <VStack gap={4}>
      {users.map((user) => (
        <UserCard key={user.userName} user={user} />
      ))}
    </VStack>
  );
};

type Props = {
  postId?: string;
};
export const FavoritesPage: FC<Props> = ({ postId }) => {
  const { data, error } = usePostFavorites(postId);
  if (error) {
    return <Error error={error.serialize()} />;
  }
  if (!data) {
    return <Loading />;
  }
  return <Component users={data.favoriteUsers} />;
};
