import { Box, Spinner, BoxProps } from '@chakra-ui/react';
import React, { FC } from 'react';

export const Loading: FC<BoxProps> = (props) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="full"
      {...props}
    >
      <Spinner color="blue.500" />
    </Box>
  );
};
