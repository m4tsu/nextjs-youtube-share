import { FC } from 'react';
import { Container as ChakraContainer, ContainerProps } from '@chakra-ui/react';
import { breakpoints } from '@/lib/chakraUI/theme';

export const Container: FC<ContainerProps> = ({ children, ...props }) => {
  return (
    <ChakraContainer
      {...props}
      maxWidth={{
        base: '100%',
        md: breakpoints.md,
        // lg: breakpoints.md,
        // xl: breakpoints.xl,
      }}
      px={0}
    >
      {children}
    </ChakraContainer>
  );
};
