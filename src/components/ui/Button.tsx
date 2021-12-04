import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps,
} from '@chakra-ui/button';
import { forwardRef } from 'react';

type ButtonProps = ChakraButtonProps & {
  isLink?: boolean;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ isLink, ...props }, ref) => (
    <ChakraButton tabIndex={isLink ? -1 : undefined} ref={ref} {...props} />
  )
);
