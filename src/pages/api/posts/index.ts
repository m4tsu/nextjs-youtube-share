import { supabaseClient } from '@/lib/supabase/client';
import { definitions } from '@/types/database';
import { NextApiRequest, NextApiResponse } from 'next';

const posts = async (req: NextApiRequest, res: NextApiResponse) => {
  const { data, error, status } = await supabaseClient
    .from<definitions['posts']>('posts')
    .select('*')
    .order('updated_at');
  if (error) {
    res.status(status).json({ error: error.message });
    return;
  }
  res.status(status).json(data);
};

export default posts;
