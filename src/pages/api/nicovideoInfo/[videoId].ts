import { NextApiRequest, NextApiResponse } from 'next';
import { Parser } from 'xml2js';

import { ApiErrorObject } from '@/utils/types/error';

const nicovideoInfo = async (req: NextApiRequest, res: NextApiResponse) => {
  const videoId = req.query.videoId as string;
  try {
    const result = await fetch(
      `https://ext.nicovideo.jp/api/getthumbinfo/${videoId}`
    );
    const xml = await result.text();
    const parser = new Parser();
    const obj = await parser.parseStringPromise(xml);
    console.log(obj.nicovideo_thumb_response.thumb[0]);
    const title = obj.nicovideo_thumb_response.thumb[0].title[0];
    const thumbnailUrl = obj.nicovideo_thumb_response.thumb[0].thumbnail_url[0];
    res.status(200).json({ title, thumbnailUrl });
  } catch (err) {
    const error: ApiErrorObject = {
      message: '動画の情報がみつかりませんでした',
      requireAlert: true,
    };
    res.status(404).json(error);
  }
};

export default nicovideoInfo;
