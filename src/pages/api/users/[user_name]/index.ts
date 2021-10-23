import { supabaseClient } from '@/lib/supabase/client';
import { definitions } from '@/types/database';
import { NextApiRequest, NextApiResponse } from 'next';

const user = async (req: NextApiRequest, res: NextApiResponse) => {
  const { user_name } = req.query;
  console.log('user api', req.query);
  const { data, error, status } = await supabaseClient
    .from<definitions['users']>('users')
    .select('*')
    .eq('user_name', user_name as string)
    .single();
  if (error) {
    console.log(error, status);
    res.status(status).json({ error: error.message });
    return;
  }
  res.status(status).json(data);
};

export default user;
