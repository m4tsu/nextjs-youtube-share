import { Box } from '@chakra-ui/layout';
import { FC, memo } from 'react';
import { FaPlayCircle } from 'react-icons/fa';

const VideoPlayerWrapper: FC = ({ children }) => (
  <Box position="relative" width="100%" pt="56.25%">
    {children}
  </Box>
);

const VideoPlayerComponent: FC<{ embedUrl: string }> = ({ embedUrl }) => {
  return (
    <VideoPlayerWrapper>
      <Box
        as="iframe"
        position="absolute"
        top="0"
        right="0"
        width="full"
        height="full"
        src={embedUrl}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded content"
      />
    </VideoPlayerWrapper>
  );
};
export const VideoPlayer = memo(VideoPlayerComponent);

const DummyPlayerComponent: FC = () => {
  return (
    <VideoPlayerWrapper>
      <Box
        width="full"
        height="full"
        top="0"
        right="0"
        backgroundColor="gray.200"
        position="absolute"
      >
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
        >
          <FaPlayCircle fontSize="48px" />
        </Box>
      </Box>
    </VideoPlayerWrapper>
  );
};
export const DummyPlayer = memo(DummyPlayerComponent);
