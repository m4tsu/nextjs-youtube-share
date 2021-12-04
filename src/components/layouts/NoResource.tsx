import { Box } from '@chakra-ui/layout';
import { FC } from 'react';

type Props = {
  resourceName?: string;
  saffix?: 'ありません。' | 'いません。';
};

export const NoResource: FC<Props> = ({
  resourceName = 'リソース',
  saffix = 'ありません。',
}) => {
  return (
    <Box py="8" textAlign="center" fontSize="lg" fontWeight="bold">
      {resourceName}が{saffix}
    </Box>
  );
};
