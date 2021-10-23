import { Spinner } from '@chakra-ui/react';
import { FC } from 'react';
import { Panel } from './Panel';

export const Loading: FC = () => {
  return (
    <Panel display="flex" justifyContent="center">
      <Spinner />
    </Panel>
  );
};
