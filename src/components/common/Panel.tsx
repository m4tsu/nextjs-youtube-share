import { Box, BoxProps } from '@chakra-ui/layout';
import { FC } from 'react';

export const Panel: FC<BoxProps> = (props) => {
  return (
    <Box
      // borderRadius="sm"
      // borderWidth="1px"
      // borderStyle="solid"
      // borderColor="lightgray"
      bgColor="white"
      // boxShadow="xs"
      // transition="box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms"
      p={4}
      {...props}
    />
  );
};
