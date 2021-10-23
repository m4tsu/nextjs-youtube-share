import { BoxProps } from '@chakra-ui/layout';
import { FC } from 'react';
import { Panel } from './Panel';

export const Card: FC<BoxProps> = (props) => {
  return (
    <Panel
      boxShadow="xs"
      bgColor="white"
      transition="box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms"
      {...props}
    />
  );
};
