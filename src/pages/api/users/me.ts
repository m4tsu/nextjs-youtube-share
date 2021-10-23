import { supabaseClient } from '@/lib/supabase/client';
import { definitions } from '@/types/database';
import { NextApiRequest, NextApiResponse } from 'next';

const user = async (req: NextApiRequest, res: NextApiResponse) => {
  const { uuid } = req.query;
  console.log('me API');
  if (req.method === 'PUT') {
    const body = req.body;
    const { data, error, status } = await supabaseClient
      .from<definitions['users']>('users')
      .update({
        user_name: 'new screen_name',
        updated_at: Date.now().toString(),
      });
    if (error) {
      res.status(status).json({ error: error.message });
      return;
    }
    res.status(status).json(data);
  } else {
    const { data, error, status } = await supabaseClient
      .from<definitions['users']>('users')
      .select('*')
      .eq('user_id', uuid as string)
      .single();
    if (error) {
      res.status(status).json({ error: error.message });
      return;
    }
    res.status(status).json(data);
  }
};

export default user;
