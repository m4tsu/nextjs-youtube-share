import { Grid } from '@chakra-ui/react';
import { FC } from 'react';

import { PostCard } from '@/components/domain/user/post/PostCard';
import { NoResourceError } from '@/components/pages/error/NoResourceError';
import { Loading } from '@/components/ui/Loading';
import { Panel } from '@/components/ui/Panel';
import { httpClient } from '@/repositories/helpers/httpClient';
import { useUserPosts } from '@/repositories/posts';

type Props = {
  userName?: string;
};
export const PostsPage: FC<Props> = ({ userName }) => {
  const { data, error } = useUserPosts(userName);
  console.log('aaaaaa', data, error);
  const hoge = async () => {
    const res = await httpClient.get('/api/users/tsuzurinnnn/posts');
    console.log(res);
  };
  // return (
  //   <div>
  //     <button onClick={hoge}>hoge</button>
  //   </div>
  // );
  if (error) {
    return <NoResourceError resourceName="投稿" />;
  }
  if (!data) {
    return <Loading />;
  }
  return (
    <Panel>
      <Grid
        templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
        gap={4}
      >
        {data.posts.map((post) => (
          <PostCard key={post.id} post={post} user={data} />
        ))}
      </Grid>
    </Panel>
  );
};
