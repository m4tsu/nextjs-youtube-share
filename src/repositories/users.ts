/* eslint-disable @typescript-eslint/no-empty-function */
import { Session } from '@supabase/gotrue-js';

import { User } from '@/types/domains/user';
import { ApiPaths, getFetchKey } from '@/utils/route/apiPaths';

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
}

export const usersRepository = UsersRepository.getInstance();

export const useUser = (userName?: string) => {
  return useFetchWithValidating<User>(
    getFetchKey({ path: '/api/users/[userName]', params: { userName } })
  );
};

export const useMe = (session: Session | null) => {
  console.log('useMe');
  return useFetch<User>(session ? getFetchKey({ path: '/api/auth/me' }) : null);
};
