/* eslint-disable @typescript-eslint/no-empty-function */
import { Session } from '@supabase/gotrue-js';

import { User } from '@/types/domains/user';
import { ApiPaths, getApiPath, getFetchKey } from '@/utils/route/apiPaths';

import { httpClient } from './helpers/httpClient';
import { useFetch, useFetchWithValidating } from './helpers/useFetch';

class UsersRepository {
  private static instance: UsersRepository;
  private constructor() {}
  static getInstance() {
    if (!UsersRepository.instance) {
      UsersRepository.instance = new UsersRepository();
    }
    return UsersRepository.instance;
  }

  async fetchMe() {
    return httpClient.get<User>(ApiPaths.me);
  }
  async createUser() {
    return await httpClient.post<User>({ url: ApiPaths.createUser });
  }
  async createUserWithUserName(userName: string) {
    return await httpClient.post<User, { userName: string }>({
      url: ApiPaths.createUserWithUserName,
      params: { userName },
    });
  }
  async follow(userId: string) {
    await httpClient.post({
      url: getApiPath({
        path: ApiPaths.follow,
        params: { userId },
      }),
    });
  }
  async unFollow(userId: string) {
    return await httpClient.delete({
      url: getApiPath({
        path: ApiPaths.follow,
        params: { userId },
      }),
    });
  }
}

// export const createPost = async (params: NewPostParams, userName: string) => {
//   const newPost = await httpClient.post<Post, NewPostParams>({
//     url: getApiPath({
//       path: '/api/users/[userName]/posts/create',
//       params: { userName },
//     }),
//     params,
//   });
//   await mutate<Post>(
//     getFetchKey({
//       path: '/api/users/[userName]/posts/[postId]',
//       params: { userName, postId: newPost.id },
//     }),
//     newPost,
//     false
//   );
//   await mutate<Post[]>(
//     getFetchKey({
//       path: '/api/users/[userName]/posts',
//       params: { userName },
//     }),
//     async (data) => (data ? { ...data, newPost } : undefined),
//     false
//   );
//   return newPost;
// };

export const usersRepository = UsersRepository.getInstance();

export const useUser = (userName?: string) => {
  return useFetchWithValidating<User>(
    getFetchKey({ path: '/api/users/[userName]', params: { userName } })
  );
};

export const useMe = (session: Session | null) => {
  return useFetch<User>(session ? getFetchKey({ path: '/api/auth/me' }) : null);
};

export const useFollowers = (userName?: string) => {
  return useFetch<User[]>(
    getFetchKey({ path: ApiPaths.followers, params: { userName } })
  );
};

export const useFollowings = (userName?: string) => {
  return useFetch<User[]>(
    getFetchKey({ path: ApiPaths.followings, params: { userName } })
  );
};
