import { Post } from '@/models/post';
import { useState } from 'react';

export const useVideoUrl = (type: Post['type'], videoUrl: string) => {
  const [embedUrl, setEmbedUrl] = useState<string | null>(null);
};
