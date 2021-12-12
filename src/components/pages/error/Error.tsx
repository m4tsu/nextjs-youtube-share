import { Box } from '@chakra-ui/layout';
import * as Sentry from '@sentry/nextjs';
import { FC } from 'react';

import { HttpErrorObject, NetworkErrorObject } from '@/utils/types/error';

type Props = {
  error: HttpErrorObject | NetworkErrorObject;
};
export const Error: FC<Props> = ({ error }) => {
  // statusによってリダイレクトとかも考える？
  Sentry.captureException(error);
  return (
    <Box py="8" textAlign="center" fontSize="lg" fontWeight="bold">
      {error.message}
    </Box>
  );
};
