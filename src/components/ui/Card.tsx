import { BoxProps } from '@chakra-ui/layout';
import { FC } from 'react';

import { Panel } from './Panel';

type Props = {
  asLinkBox?: boolean;
} & BoxProps;
export const Card: FC<Props> = ({ asLinkBox, ...props }) => {
  return (
    <Panel
      asLinkBox={asLinkBox}
      boxShadow="xs"
      borderColor="gray.300"
      borderWidth="1px"
      bgColor="white"
      transition="box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms"
      borderRadius="md"
      _hover={{ boxShadow: 'lg' }}
      {...props}
    />
  );
};
