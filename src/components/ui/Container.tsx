import { Container as ChakraContainer, ContainerProps } from '@chakra-ui/react';
import { FC, forwardRef } from 'react';

import { breakpoints } from '@/lib/chakraUI/theme';

export const Container: FC<ContainerProps> = forwardRef<
  HTMLDivElement,
  ContainerProps
>(({ children, ...props }, ref) => {
  return (
    <ChakraContainer
      ref={ref}
      {...props}
      // maxWidth={{
      //   base: '100%',
      //   md: breakpoints.md,
      //   lg: breakpoints.lg,
      //   // xl: breakpoints.xl,
      // }}
      maxWidth={breakpoints.xl}
      // px={4}
    >
      {children}
    </ChakraContainer>
  );
});
