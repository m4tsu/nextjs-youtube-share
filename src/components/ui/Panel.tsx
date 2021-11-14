import { Box, BoxProps, LinkBox } from '@chakra-ui/layout';
import { useStyleConfig } from '@chakra-ui/system';
import { FC } from 'react';

type Props = {
  asLinkBox?: boolean;
  variant?: string;
} & BoxProps;
export const Panel: FC<Props> = ({ asLinkBox, variant, ...props }) => {
  const styles = useStyleConfig('Panel', { variant });
  return asLinkBox ? (
    <Box as={LinkBox} __css={styles} {...props} />
  ) : (
    <Box __css={styles} {...props} />
  );
};
