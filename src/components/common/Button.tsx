import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps,
} from '@chakra-ui/button';
import { LightMode } from '@chakra-ui/color-mode';
import { ComponentWithAs } from '@chakra-ui/system';
import { FC } from 'react';

type ButtonProps = ChakraButtonProps & {
  isLink?: boolean;
};

export const Button: FC<ButtonProps> = ({ isLink, ...props }) => (
  <LightMode>
    <ChakraButton tabIndex={isLink ? -1 : undefined} {...props} />
  </LightMode>
);
