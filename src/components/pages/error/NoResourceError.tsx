import { Panel } from '@/components/common/Panel';
import { Box } from '@chakra-ui/layout';
import { FC } from 'react';

type Props = {
  resourceName?: string;
};

export const NoResourceError: FC<Props> = ({ resourceName = 'リソース' }) => {
  return (
    <Box py="8" textAlign="center" fontSize="lg" fontWeight="bold">
      {resourceName}が見つかりませんでした。
    </Box>
  );
};
