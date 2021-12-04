import { NextApiRequest, NextApiResponse } from 'next';

import { supabaseClient } from '@/lib/supabase/client';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await supabaseClient.auth.api.setAuthCookie(req, res);
  return res.status(200).end();
};

export default handler;
