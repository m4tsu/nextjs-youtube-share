import { supabaseClient } from '@/lib/supabase/client';
import { User } from '@/models/user';
import useSWR from 'swr';
import { handleSupabaseResponse } from './helper';
import { api, useFetch } from './useFetch';

// export const useUser = (screen_name?: string) => {
//   return useFetch<User>(screen_name ? `/api/users/${screen_name}` : null);
// };

// export const useMe = () => {
//   const session = supabaseClient.auth.session();
//   return useFetch<User>(`/api/users/me?uuid=${session?.user?.id}`);
// };

const usersRepository = {
  fetchMe: async (userId?: string) => {
    return handleSupabaseResponse(
      await supabaseClient
        .from<User>('users')
        .select('*')
        .eq('user_id', userId)
        .single()
    );
  },
  fetchUser: async (userName?: string) => {
    return handleSupabaseResponse(
      await supabaseClient
        .from<User>('users')
        .select('*')
        .eq('user_name', userName)
        .single()
    );
  },
};

export const useUser = (userName?: string) => {
  return useSWR(userName ? `/api/users/${userName}` : null, async () =>
    usersRepository.fetchUser(userName)
  );
};

export const useMe = (userId?: string) => {
  return useSWR(userId ? '/api/auth/me' : null, async () =>
    usersRepository.fetchMe(userId)
  );
};

type UpdateUserParams = Partial<
  Pick<User, 'display_name' | 'photo_url' | 'user_name' | 'updated_at'>
>;
export const updateMe = async (user_id: string, params: UpdateUserParams) => {
  const res = api.post<User, UpdateUserParams>({
    url: `/api/users/me?uuid=${user_id}`,
    params,
  });
  return res;
};
