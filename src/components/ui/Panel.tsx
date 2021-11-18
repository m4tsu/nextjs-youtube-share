import { Box, BoxProps, LinkBox } from '@chakra-ui/layout';
import { useStyleConfig } from '@chakra-ui/system';
import { FC, forwardRef } from 'react';

type Props = {
  asLinkBox?: boolean;
  variant?: string;
} & BoxProps;
export const Panel: FC<Props> = forwardRef<HTMLDivElement, Props>(
  ({ asLinkBox, variant, ...props }, ref) => {
    const styles = useStyleConfig('Panel', { variant });
    return asLinkBox ? (
      <Box as={LinkBox} __css={styles} ref={ref} {...props} />
    ) : (
      <Box __css={styles} ref={ref} {...props} />
    );
  }
);
