import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps,
} from '@chakra-ui/button';
import { LightMode } from '@chakra-ui/color-mode';
import { forwardRef } from 'react';

type ButtonProps = ChakraButtonProps & {
  isLink?: boolean;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ isLink, ...props }, ref) => {
    const isSolid = props.variant === 'solid' || !props.variant;
    return isSolid ? (
      <LightMode>
        <ChakraButton tabIndex={isLink ? -1 : undefined} ref={ref} {...props} />
      </LightMode>
    ) : (
      <ChakraButton tabIndex={isLink ? -1 : undefined} ref={ref} {...props} />
    );
  }
);
