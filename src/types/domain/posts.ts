import { User } from '@/types/domain/users';
import { definitions } from '@/types/database';

type p = definitions['posts'];

export interface Post extends p {
  type: 'youtube' | 'nicovideo';
  // user: User;
}

export type UserPosts = User & {
  posts: Post[];
};

export interface NicovideoInfo {
  title: string;
  thumbnail: string;
}

export interface NewPostParams {
  title: string;
  body: string;
  thumbnailUrl?: string;
  type: Post['type'];
  videoId: string;
}
