import { toast } from '@/lib/chakraUI/theme';
import { supabaseClient } from '@/lib/supabase/client';
import { getPath } from '@/utils/route/Link';
import {
  HttpError,
  SupabaseError,
  UnAuthorizedError,
} from '@/utils/types/error';
import {
  PostgrestError,
  PostgrestResponse,
  PostgrestSingleResponse,
} from '@supabase/postgrest-js';
import router from 'next/router';

export const handleSupabaseResponse = <
  Data,
  Response extends PostgrestResponse<Data> | PostgrestSingleResponse<Data>
>(
  res: Response
): Exclude<Response['data'], null> => {
  const { data, error, status } = res;
  if (error) {
    console.log('supabase error', status, error);
    throw new SupabaseError(error);
  }
  if (!data) {
    throw new Error(`status: ${status}, resource not found`);
  }
  // @ts-ignore
  return data; //TODO: 何故Typeエラーになるのかわからない
};

export const authenticate = () => {
  const user_id = supabaseClient.auth.session()?.user?.id;
  if (!user_id) {
    router.push(getPath({ path: '/login' }));
    toast({
      title: 'ログインしてください.',
      status: 'error',
    });
    throw new UnAuthorizedError({ actionName: 'addPost' });
  }
  return { user_id };
};
