import { supabaseClient } from '@/lib/supabase/client';
import { Post } from '@/types/domain/posts';
import { definitions } from '@/types/database';
import { NextApiRequest, NextApiResponse } from 'next';

const userPosts = async (req: NextApiRequest, res: NextApiResponse) => {
  const user_name = req.query.user_name as string;
  if (req.method === 'POST') {
    const { data, error, status } = await supabaseClient
      .from<Post>('posts')
      .insert({
        type: 'youtube',
        title: 'ぽえ222222222',
        body: 'hogehogdsajg;oajsdgpajsgpoae',
        user_id: 'aa8cbe76-98ec-4fad-92af-ef2717a8b9cf',
        video_id: '9QLT1Aw_45s',
      });
    console.log(data, error, status);
    if (error) {
      res.status(status).json({ error: error.message });
      return;
    }
    res.status(status).json(data);
    return;
  }
  const { data, error, status } = await supabaseClient
    .from<definitions['users']>('users')
    .select('*, posts:posts (*)')
    .eq('user_name', user_name)
    .single();
  if (error) {
    res.status(status).json({ error: error.message });
    return;
  }
  res.status(status).json(data);
};

export default userPosts;
