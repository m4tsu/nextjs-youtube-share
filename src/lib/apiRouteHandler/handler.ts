import { User } from '@supabase/gotrue-js';
import { NextApiRequest, NextApiResponse } from 'next';
import nc, { Options } from 'next-connect';
import { ApiError } from 'next/dist/server/api-utils';

import { ApiErrorObject } from '@/utils/types/error';

import { supabaseClient } from '../supabase/client';

const options: Options<NextApiRequest, NextApiResponse<ApiErrorObject>> = {
  onError: (err, req, res) => {
    if (err instanceof ApiError) {
      const error: ApiErrorObject = {
        message: err.message,
        requireAlert: true,
      };
      return res.status(err.statusCode).json(error);
    }
    console.error(err.message);
    const error: ApiErrorObject = { message: err.message, unexpected: true };
    return res.status(500).end(error);
  },
  onNoMatch: (req, res) => {
    const error: ApiErrorObject = {
      message: 'ページが見つかりません.',
      unexpected: true,
    };
    return res.status(404).end(error);
  },
};

export const authenticate = (
  req: NextApiRequest & { currentUser: User | null }
) => {
  if (!req.currentUser) {
    throw new ApiError(401, 'ログインしてください.');
  }
  return req.currentUser;
};

export const handler = <T = Record<string, unknown>>() =>
  nc<
    NextApiRequest & { currentUser: User | null },
    NextApiResponse<T | ApiErrorObject>
  >(options).use(async (req, res, next) => {
    const { user } = await supabaseClient.auth.api.getUserByCookie(req);
    req.currentUser = user;
    next();
  });
