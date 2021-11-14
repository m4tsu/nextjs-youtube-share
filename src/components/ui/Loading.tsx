import { Box, Spinner } from '@chakra-ui/react';
import React, { FC } from 'react';

export const Loading: FC = () => {
  return (
    <Box display="flex" justifyContent="center" p={4}>
      <Spinner color="blue.500" />
    </Box>
  );
};
