import { supabaseClient } from '@/lib/supabase/client';
import { definitions } from '@/types/database';
import { NextApiRequest, NextApiResponse } from 'next';

const post = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const { data, error, status } = await supabaseClient
    .from<definitions['posts']>('posts')
    .select('*')
    .eq('id', id as string)
    .single();
  if (error) {
    res.status(status).json({ error: error.message });
    return;
  }
  res.status(status).json(data);
};

export default post;
