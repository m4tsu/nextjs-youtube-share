import { Box } from '@chakra-ui/layout';
import React, { VFC } from 'react';
import Youtube from 'react-youtube';

type Props = {
  videoId: string;
  setVideoTitle?: (title: string) => void;
};
export const YoutubePlayer: VFC<Props> = React.memo(
  ({ videoId, setVideoTitle }) => {
    const handleVideoReady = (event: any) => {
      if (setVideoTitle && event.target.getVideoData().title) {
        setVideoTitle(event.target.getVideoData().title);
      }
    };

    return (
      <Box
        position="relative"
        width="100%"
        pt="56.25%"
        sx={{
          iframe: {
            position: 'absolute',
            top: 0,
            right: 0,
            width: '100%',
            height: '100%',
          },
        }}
      >
        <Youtube
          onReady={handleVideoReady}
          videoId={videoId}
          onStateChange={handleVideoReady}
        />
      </Box>
    );
  }
);
