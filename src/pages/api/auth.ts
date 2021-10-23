import { supabaseClient } from '@/lib/supabase/client';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.cookies, req.headers);
  await supabaseClient.auth.api.setAuthCookie(req, res);
  await hoge(req);
};

const hoge = async (req: NextApiRequest) => {
  const { data: authUser, error } =
    await supabaseClient.auth.api.getUserByCookie(req); //これでcookieから認証を確認できる
  console.log(authUser, error);
};

export default handler;
