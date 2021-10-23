import { getNowDateTime } from '@/lib/dayjs/utils';
import { supabaseClient } from '@/lib/supabase/client';
import {
  NewPostParams,
  NicovideoInfo,
  Post,
  UserPosts,
} from '@/types/domain/posts';
import { HttpError, UnAuthorizedError } from '@/utils/types/error';
import useSWR, { mutate } from 'swr';
import { authenticate, handleSupabaseResponse } from './helper';
import { useFetch } from './useFetch';
import router from 'next/router';
import { getPath } from '@/utils/route/Link';
import { toast } from '@/lib/chakraUI/theme';

class PostsRepository {
  private static instance: PostsRepository;
  private constructor() {}
  static getInstance() {
    if (!PostsRepository.instance) {
      PostsRepository.instance = new PostsRepository();
    }
    return PostsRepository.instance;
  }

  async fetchPost(postId?: string) {
    return handleSupabaseResponse(
      await supabaseClient
        .from<Post>('posts')
        .select('*')
        .eq('id', postId)
        .single()
    );
  }

  async fetchAllPosts() {
    return handleSupabaseResponse(
      await supabaseClient.from<Post>('posts').select('*').order('updated_at')
    );
  }

  async fetchUserPosts(userName?: string) {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    return handleSupabaseResponse(
      await supabaseClient
        .from<UserPosts>('users')
        .select('*, posts!posts_user_id_fkey(*)')
        .eq('user_name', userName)
        .order('created_at', { foreignTable: 'posts', ascending: false })
        .single()
    );
  }
  // async fetchUserPosts(userName?: string) {
  //   return handleSupabaseResponse(
  //     await supabaseClient
  //       .from<Post>('posts')
  //       .select('*, user:users!posts_user_id_fkey(*)')
  //       //@ts-ignore
  //       .eq('users.user_name', userName, { filterSource: true })
  //       .order('created_at', { ascending: false })
  //   );
  // }

  async createPost({
    type,
    title,
    body,
    videoId,
    thumbnailUrl,
  }: NewPostParams) {
    const { user_id } = authenticate();
    return handleSupabaseResponse(
      await supabaseClient
        .from<Post>('posts')
        .insert({
          type,
          title,
          body,
          thumbnail_url: thumbnailUrl,
          user_id,
          video_id: videoId,
          updated_at: getNowDateTime(),
        })
        .single()
    );
  }
}

export const postsRepository = PostsRepository.getInstance();

// operations, hooks
export const usePost = (postId?: string) => {
  return useSWR(postId ? `/api/posts/${postId}` : null, async () =>
    postsRepository.fetchPost(postId)
  );
};

export const useAllPosts = () => {
  return useSWR('/api/allPosts', async () => postsRepository.fetchAllPosts());
};

export const useUserPosts = (userName?: string) => {
  return useSWR<UserPosts, HttpError>(
    userName ? `/api/users/${userName}/posts` : null,
    async () => postsRepository.fetchUserPosts(userName)
  );
};

export const addPost = async (params: NewPostParams, userName: string) => {
  const post = await postsRepository.createPost(params);
  const result = await mutate<Post>(`/api/posts/${post.id}`, post, false);
  await mutate<UserPosts>(
    `/api/users/${userName}/posts`,
    async (data) =>
      data ? { ...data, posts: [post, ...data.posts] } : undefined,
    false
  );
  return post;
};

export const useNicovideoInfo = (video_id?: string) => {
  console.log(video_id);
  return useFetch<NicovideoInfo>(
    video_id ? `/api/nicovideoInfo/${video_id}` : null
  );
};
