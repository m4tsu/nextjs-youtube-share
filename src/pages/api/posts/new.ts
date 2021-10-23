import { supabaseClient } from '@/lib/supabase/client';
import { definitions } from '@/types/database';
import { NextApiRequest, NextApiResponse } from 'next';

const post = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  console.log('cookies', req.cookies);

  const result = await supabaseClient.auth.setAuth(req.cookies['sb:token']);
  console.log(result);
  const { data, error, status } = await supabaseClient
    .from<definitions['posts']>('posts')
    .insert([
      {
        type: 'youtube',
        title: 'test3fgsfgdsfgsdfgsgfdgs',
        body: 'hogehogefgsdgfsdfgsdgfsdgdsgfsdgsd',
        user_id: 'aa8cbe76-98ec-4fad-92af-ef2717a8b9cf',
        video_id: 'c1tSz6l91xU',
      },
    ]);
  console.log(data, error);
  if (error) {
    res.status(status).json({ error: error.message });
    return;
  }
  res.status(status).json(data);
};

export default post;
