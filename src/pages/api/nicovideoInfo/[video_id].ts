import { supabaseClient } from '@/lib/supabase/client';
import { definitions } from '@/types/database';
import { NextApiRequest, NextApiResponse } from 'next';
import { Parser } from 'xml2js';

const nicovideoInfo = async (req: NextApiRequest, res: NextApiResponse) => {
  const video_id = req.query.video_id as string;
  try {
    const result = await fetch(
      `https://ext.nicovideo.jp/api/getthumbinfo/${video_id}`
    );
    const xml = await result.text();
    const parser = new Parser();
    const obj = await parser.parseStringPromise(xml);
    const title = obj.nicovideo_thumb_response.thumb[0].title[0];
    const thumbnailUrl = obj.nicovideo_thumb_response.thumb[0].thumbnail_url[0];
    res.status(200).json({ title, thumbnailUrl });
  } catch (err) {
    console.log(err);
    res.status(404).json({ error: 'Not Found' });
  }
};

export default nicovideoInfo;
