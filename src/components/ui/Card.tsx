import { Box, BoxProps, LinkBox } from '@chakra-ui/layout';
import { useStyleConfig } from '@chakra-ui/system';
import { FC, forwardRef } from 'react';

type Props = {
  asLinkBox?: boolean;
} & BoxProps;
export const Card: FC<Props> = forwardRef<HTMLDivElement, Props>(
  ({ asLinkBox, ...props }, ref) => {
    const styles = useStyleConfig('Card');
    return asLinkBox ? (
      <Box as={LinkBox} __css={styles} ref={ref} {...props} />
    ) : (
      <Box __css={styles} ref={ref} {...props} />
    );
  }
);
