import { User } from '@/models/user';
import { updateMe } from '@/repositories/users';
import { definitions } from '@/types/database';
import { User as AuthUser } from '@supabase/supabase-js';
import { KeyedMutator } from 'swr';

type UserMetaData = {
  avatar_url: string;
  full_name: string;
  user_name: string;
};

export const syncMeWithAuthUserMetaData = async (
  authUser: AuthUser,
  me: User,
  mutate: KeyedMutator<User>
) => {
  const { avatar_url, full_name, user_name } =
    authUser.user_metadata as UserMetaData;
  try {
    const diff: Partial<definitions['users']> = {};
    if (me.display_name !== full_name) {
      diff.display_name = full_name;
    }
    if (me.user_name !== user_name) {
      diff.user_name = user_name;
    }
    if (me.photo_url !== avatar_url) {
      diff.photo_url = avatar_url;
    }
    console.log('diff', diff);
    if (diff.display_name || diff.photo_url || diff.user_name) {
      const res = await updateMe(authUser.id, diff);
      console.log('updated User');
      mutate(res);
    }
  } catch (err) {
    console.log('user profile not found', err);
  }
};
