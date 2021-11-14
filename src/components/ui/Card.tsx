import { Box, BoxProps, LinkBox } from '@chakra-ui/layout';
import { useStyleConfig } from '@chakra-ui/system';
import { FC } from 'react';

type Props = {
  asLinkBox?: boolean;
} & BoxProps;
export const Card: FC<Props> = ({ asLinkBox, ...props }) => {
  const styles = useStyleConfig('Card');
  return asLinkBox ? (
    <Box as={LinkBox} __css={styles} {...props} />
  ) : (
    <Box __css={styles} {...props} />
  );
};
