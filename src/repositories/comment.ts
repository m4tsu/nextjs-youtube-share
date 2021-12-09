import { mutate } from 'swr';

import { Comment, NewCommentParams } from '@/types/domains/comment';
import { Post } from '@/types/domains/post';
import { User } from '@/types/domains/user';
import { getApiPath, getFetchKey } from '@/utils/route/apiPaths';

import { httpClient } from './helpers/httpClient';

class CommentsRepository {
  private static instance: CommentsRepository;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}
  static getInstance() {
    if (!CommentsRepository.instance) {
      CommentsRepository.instance = new CommentsRepository();
    }
    return CommentsRepository.instance;
  }

  createComment = async (
    userName: User['userName'],
    postId: Post['id'],
    params: NewCommentParams
  ) => {
    const newComment = await httpClient.post<Comment, NewCommentParams>({
      url: getApiPath({
        path: '/api/posts/[postId]/comments',
        params: { postId },
      }),
      params,
    });
    await mutate<Post>(
      getFetchKey({
        path: '/api/users/[userName]/posts/[postId]',
        params: { userName, postId: postId },
      }),
      (post) => {
        if (!post) return undefined;
        return {
          ...post,
          comments: post.comments
            ? [...post.comments, newComment]
            : [newComment],
        };
      },
      false
    );
    return newComment;
  };

  deleteComment = async (
    userName: User['userName'],
    postId: Post['id'],
    commentId: Comment['id']
  ) => {
    const deleted = await httpClient.delete<Comment>({
      url: getApiPath({
        path: '/api/posts/[postId]/comments/[commentId]',
        params: { commentId, postId },
      }),
    });

    await mutate<Post>(
      getFetchKey({
        path: '/api/users/[userName]/posts/[postId]',
        params: { userName, postId: postId },
      }),
      (post) => {
        if (!post) return undefined;
        return {
          ...post,
          comments: post.comments?.map((comment) => {
            if (comment.id !== commentId) return comment;
            if (!deleted.deletedBy) {
              throw new Error('Unexpected!!!');
            }
            const { content, ...rest } = comment;
            return { ...rest, content: null, deletedBy: deleted.deletedBy };
          }),
        };
      },
      false
    );
  };
}

export const commentsRepository = CommentsRepository.getInstance();
