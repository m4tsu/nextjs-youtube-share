import { Post } from '@/types/domain/posts';
import { assertUnexpectedValue } from '../assertUnexpectedValue';

const videoPatterns = [
  /^https:\/\/youtu.be\/(.+)$/,
  /^https:\/\/www.youtube.com\/watch\?v=(.+)$/,
];
const playlistPattern = /^https:\/\/www.youtube.com\/playlist\?list=(.+)$/;
const nicovideoPattern = [
  /^https:\/\/nico.ms\/(sm.+)$/,
  /^https:\/\/www.nicovideo.jp\/watch\/(sm.+)$/,
];

export const getThumbnail = (type: Post['type'], video_id: string) => {
  switch (type) {
    case 'youtube': {
      return `http://i.ytimg.com/vi/${video_id}/mqdefault.jpg`;
    }

    case 'nicovideo': {
      // return `https://nicovideo.cdn.nimg.jp/thumbnails/${32559385}/${32559385}.50952`;
      return 'https://nicovideo.cdn.nimg.jp/thumbnails/32559385/32559385.50924';
    }

    default: {
      return assertUnexpectedValue(type);
    }
  }
};

export const getEmbedUrl = (type: Post['type'], videoId: Post['video_id']) => {
  switch (type) {
    case 'youtube': {
      return `https://www.youtube.com/embed/${videoId}?rel=0`;
    }
    case 'nicovideo': {
      return `https://embed.nicovideo.jp/watch/${videoId}?oldScript=1&referer=&from=0&allowProgrammaticFullScreen=1`;
    }
    default: {
      return assertUnexpectedValue(type);
    }
  }
};

type ValidateUrl = (
  type: Post['type'],
  url: string
) => { videoId: string; isValid: true } | { isValid: false };
export const validateUrl: ValidateUrl = (type: Post['type'], url: string) => {
  console.log(type, url);
  switch (type) {
    case 'youtube': {
      const result = url.match(videoPatterns[0]) || url.match(videoPatterns[1]);

      return result
        ? { videoId: result[1], isValid: true }
        : { isValid: false };
    }
    case 'nicovideo': {
      const result =
        url.match(nicovideoPattern[0]) || url.match(nicovideoPattern[1]);

      console.log(result);
      return result
        ? { videoId: result[1], isValid: true }
        : { isValid: false };
    }
    default: {
      return assertUnexpectedValue(type);
    }
  }
};

export const getVideoIdByUrl = (type: Post['type'], url: string) => {
  switch (type) {
    case 'youtube': {
      const result = !!(
        url.match(videoPatterns[0]) || url.match(videoPatterns[1])
      );
      console.log(result);
      return !!(url.match(videoPatterns[0]) || url.match(videoPatterns[1]));
    }
    case 'nicovideo': {
      const result = !!(
        url.match(nicovideoPattern[0]) || url.match(nicovideoPattern[1])
      );
      console.log(result);
      return !!(
        url.match(nicovideoPattern[0]) || url.match(nicovideoPattern[1])
      );
    }
    default: {
      return assertUnexpectedValue(type);
    }
  }
};
