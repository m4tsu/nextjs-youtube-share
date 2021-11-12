import { mutate } from 'swr';

import {
  NewPostParams,
  NicovideoInfo,
  Post,
  PostFavorites,
} from '@/types/domains/post';
import { UserPosts } from '@/types/domains/user';
import { ApiPaths, getApiPath, getFetchKey } from '@/utils/route/apiPaths';

import { httpClient } from './helpers/httpClient';
import { useFetch } from './helpers/useFetch';
import { useInfiniteFetch } from './helpers/useInfiniteFetch';
class PostsRepository {
  private static instance: PostsRepository;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}
  static getInstance() {
    if (!PostsRepository.instance) {
      PostsRepository.instance = new PostsRepository();
    }
    return PostsRepository.instance;
  }

  createPost = async (params: NewPostParams, userName: string) => {
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

  favorite = async (postId: string) => {
    await httpClient.post({
      url: getApiPath({
        path: '/api/posts/[postId]/favorites',
        params: { postId },
      }),
    });
  };
  unFavorite = async (postId: string) => {
    await httpClient.delete({
      url: getApiPath({
        path: '/api/posts/[postId]/favorites',
        params: { postId },
      }),
    });
  };
}

export const postsRepository = PostsRepository.getInstance();

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

export const usePostFavorites = (postId?: string) => {
  return useFetch<PostFavorites>(
    getFetchKey({ path: '/api/posts/[postId]/favorites', params: { postId } })
  );
};

export const useUserPosts = (
  pageIndex: number,
  perPage: number,
  userName?: string,
  categoryName?: string
) => {
  const { data, error } = useFetch<UserPosts>(
    // usePaginationFetch<UserPosts>(
    getFetchKey({
      path: '/api/users/[userName]/posts',
      params: { userName },
      query: { pageIndex, perPage, categoryName },
    })
    // pageIndex,
    // perPage
  );
  const totalPage = data?.postsCount
    ? Math.ceil(data.postsCount / perPage)
    : null; // TODO: ページネーションある時の返ってくるデータの方を統一して、usePaginationFetchに寄せるべきだけどめんどい
  return { data, error, totalPage };
};

export const useAllPosts = (limit: number) => {
  return useInfiniteFetch<Post>(limit, ApiPaths.posts);
};
