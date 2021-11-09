import { Box, BoxProps, LinkBox } from '@chakra-ui/layout';
import { FC } from 'react';

type Props = {
  asLinkBox?: boolean;
} & BoxProps;
export const Panel: FC<Props> = ({ asLinkBox, ...props }) => {
  return asLinkBox ? (
    <LinkBox bgColor="white" p={4} {...props} />
  ) : (
    <Box bgColor="white" p={4} {...props} />
  );
};
