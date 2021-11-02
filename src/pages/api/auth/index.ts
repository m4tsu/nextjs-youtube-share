import { NextApiRequest, NextApiResponse } from 'next';

import { supabaseClient } from '@/lib/supabase/client';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.cookies);
  await supabaseClient.auth.api.setAuthCookie(req, res);
};

export default handler;
