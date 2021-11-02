import { mutate } from 'swr';

import { NewPostParams, NicovideoInfo, Post } from '@/types/domains/post';
import { User } from '@/types/domains/user';
import { ApiPaths, getApiPath, getFetchKey } from '@/utils/route/apiPaths';

import { httpClient } from './helpers/httpClient';
import { useFetch, useInfiniteFetch } from './helpers/useFetch';
// class PostsRepository {
//   private static instance: PostsRepository;
//   private constructor() {}
//   static getInstance() {
//     if (!PostsRepository.instance) {
//       PostsRepository.instance = new PostsRepository();
//     }
//     return PostsRepository.instance;
//   }

// async fetchPost(postId?: string) {
//   return handleSupabaseResponse(
//     await supabaseClient
//       .from<Post>('posts')
//       .select('*')
//       .eq('id', postId)
//       .single()
//   );
// }

// async fetchAllPosts() {
//   return handleSupabaseResponse(
//     await supabaseClient.from<Post>('posts').select('*').order('updated_at')
//   );
// }

// async fetchUserPosts(userName?: string) {
//   await new Promise((resolve) => setTimeout(resolve, 3000));
//   return handleSupabaseResponse(
//     await supabaseClient
//       .from<UserPosts>('users')
//       .select('*, posts!posts_user_id_fkey(*)')
//       .eq('userName', userName)
//       .order('created_at', { foreignTable: 'posts', ascending: false })
//       .single()
//   );
// }
// async fetchUserPosts(userName?: string) {
//   return handleSupabaseResponse(
//     await supabaseClient
//       .from<Post>('posts')
//       .select('*, user:users!posts_user_id_fkey(*)')
//       //@ts-ignore
//       .eq('users.userName', userName, { filterSource: true })
//       .order('created_at', { ascending: false })
//   );
// }

// async createPost({
//   type,
//   title,
//   body,
//   videoId,
//   thumbnailUrl,
// }: NewPostParams) {
//   const { user_id } = authenticate();
//   return handleSupabaseResponse(
//     await supabaseClient
//       .from<Post>('posts')
//       .insert({
//         type,
//         title,
//         body,
//         thumbnail_url: thumbnailUrl,
//         user_id,
//         video_id: videoId,
//         updated_at: getNowDateTime(),
//       })
//       .single()
//   );
// }

// }

// export const postsRepository = PostsRepository.getInstance();

// operations, hooks
// export const usePost = (postId?: string) => {
//   return useSWR(postId ? `/api/posts/${postId}` : null, async () =>
//     postsRepository.fetchPost(postId)
//   );
// };

// export const useAllPosts = () => {
//   return useSWR('/api/allPosts', async () => postsRepository.fetchAllPosts());
// };

// export const useUserPosts = (userName?: string) => {
//   return useSWR<UserPosts, HttpError>(
//     userName ? `/api/users/${userName}/posts` : null,
//     async () => postsRepository.fetchUserPosts(userName)
//   );
// };

// export const addPost = async (params: NewPostParams, userName: string) => {
//   const post = await postsRepository.createPost(params);
//   const result = await mutate<Post>(`/api/posts/${post.id}`, post, false);
//   await mutate<UserPosts>(
//     `/api/users/${userName}/posts`,
//     async (data) =>
//       data ? { ...data, posts: [post, ...data.posts] } : undefined,
//     false
//   );
//   return post;
// };

export const createPost = async (params: NewPostParams, userName: string) => {
  const newPost = await httpClient.post<Post, NewPostParams>({
    url: getApiPath({
      path: '/api/users/[userName]/posts/create',
      params: { userName },
    }),
    params,
  });
  await mutate<Post>(
    getFetchKey({
      path: '/api/users/[userName]/posts/[postId]',
      params: { userName, postId: newPost.id },
    }),
    newPost,
    false
  );
  await mutate<Post[]>(
    getFetchKey({
      path: '/api/users/[userName]/posts',
      params: { userName },
    }),
    async (data) => (data ? { ...data, newPost } : undefined),
    false
  );
  return newPost;
};

export const useNicovideoInfo = (videoId?: string) => {
  return useFetch<NicovideoInfo>(
    getFetchKey({ path: '/api/nicovideoInfo/[videoId]', params: { videoId } })
  );
};

export const usePost = (userName?: string, postId?: string) => {
  return useFetch<Post>(
    getFetchKey({
      path: '/api/users/[userName]/posts/[postId]',
      params: { userName, postId },
    })
  );
};

export const useUserPosts = (userName?: string) => {
  return useFetch<User & { posts: Post[] }>(
    getFetchKey({ path: '/api/users/[userName]/posts', params: { userName } })
  );
};

export const useAllPosts = (limit: number) => {
  return useInfiniteFetch<Post>(limit, ApiPaths.posts);
};
