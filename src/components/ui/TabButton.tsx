import { ButtonProps } from '@chakra-ui/button';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { MenuItem } from '@chakra-ui/menu';
import { FC } from 'react';

import { Button } from '@/components/ui/Button';

export const TabButton: FC<
  { isActive?: boolean; asMenuItem?: boolean } & ButtonProps
> = ({ isActive, asMenuItem, ...props }) => {
  const color = useColorModeValue('textMain', 'white');
  const bgColor = useColorModeValue('gray.100', 'darkPrimary.500');
  return asMenuItem ? (
    <MenuItem
      width="full"
      variant="link"
      borderRadius="sm"
      lineHeight="unset"
      alignItems="center"
      color={color}
      fontWeight={isActive ? 'bold' : 'normal'}
      fontSize="lg"
      py={1}
      pl={1}
      justifyContent="flex-start"
      bgColor={isActive ? bgColor : 'inherit'}
      _hover={{
        textDecoration: 'none',
        bgColor,
      }}
      sx={{ gap: '.5rem' }}
      {...props}
    />
  ) : (
    <Button
      width="full"
      variant="link"
      borderRadius="sm"
      lineHeight="unset"
      alignItems="center"
      color={color}
      fontWeight={isActive ? 'bold' : 'thin'}
      fontSize="lg"
      py={1}
      pl={1}
      justifyContent="flex-start"
      bgColor={isActive ? bgColor : 'inherit'}
      _hover={{
        textDecoration: 'none',
        bgColor,
      }}
      isLink
      sx={{ gap: '.5rem' }}
      {...props}
    />
  );
};
