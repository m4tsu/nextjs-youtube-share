import qs from 'query-string';

import { ParamKeys } from './Link';

export const ApiPaths = {
  createUser: '/api/auth/createUser',
  createUserWithUserName: '/api/auth/createUserWithUserName',
  me: '/api/auth/me',
  posts: '/api/posts',
  user: '/api/users/[userName]',
  userCategories: '/api/users/[userName]/categories',
  userCategoryPost: '/api/users/[userName]/categories/[categoryName]',
  userPosts: '/api/users/[userName]/posts',
  userPost: '/api/users/[userName]/posts/[postId]',
  favorites: '/api/posts/[postId]/favorites',
  userFollowers: '/api/users/[userName]/followers',
  userFollowings: '/api/users/[userName]/followings',
  createPost: '/api/users/[userName]/posts/create',

  follow: '/api/users/follow/[userId]',
  nicovideoInfo: '/api/nicovideoInfo/[videoId]',
} as const;

export type ApiPathKeys = keyof typeof ApiPaths;
export type ApiPath = typeof ApiPaths[ApiPathKeys];

type FetcKeyParams<T> = {
  path: T;
  params?: { [K in ParamKeys<T>]: string | number | null | undefined };
};
type FetchKeyArg<T> = ParamKeys<T> extends never
  ? FetcKeyParams<T>
  : Required<FetcKeyParams<T>>;

// useFetch用のkey生成関数.必要なparamsが無ければnullを返す
export const getFetchKey = <T extends ApiPath>({
  path,
  params,
  query,
}: FetchKeyArg<T> & {
  query?: { [key: string]: string | number | string[] | undefined };
}) => {
  if (params === undefined) {
    return path;
  }
  // paramsの全ての値が null | undefinedではないならば true
  const isParamsExist = (Object.keys(params) as (keyof typeof params)[]).every(
    (key) => !!params[key]
  );
  if (isParamsExist) {
    const queryString = query ? `?${qs.stringify(query)}` : '';
    return (
      path
        .split('/')
        .map((str) => {
          const match = str.match(/\[(.*?)\]/);
          if (match) {
            const key = match[0];
            const trimmed = key.substring(1, key.length - 1) as ParamKeys<
              typeof path
            >;
            return params[trimmed];
          }
          return str;
        })
        .join('/') + queryString
    );
  }
  return null;
};

type PathParams<T> = {
  path: T;
  params?: { [K in ParamKeys<T>]: string | number };
};
export type Args<T> = ParamKeys<T> extends never
  ? PathParams<T>
  : Required<PathParams<T>>;
export const getApiPath = <T extends ApiPath>({ path, params }: Args<T>) => {
  if (!params) {
    return path;
  }
  return path
    .split('/')
    .map((str) => {
      const match = str.match(/\[(.*?)\]/);
      if (match) {
        const key = match[0];
        const trimmed = key.substring(1, key.length - 1) as ParamKeys<
          typeof path
        >;
        return params[trimmed];
      }
      return str;
    })
    .join('/');
};
