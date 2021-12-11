import { Img } from '@chakra-ui/image';
import { Box } from '@chakra-ui/layout';
import { FC, memo } from 'react';

type Props = {
  src: string;
};
const Component: FC<Props> = ({ src }) => {
  return (
    <Box>
      <Img
        src={src}
        width="full"
        objectFit="cover"
        sx={{ aspectRatio: '16/9' }}
      />
    </Box>
  );
};
export const Thumbnail = memo(Component);
