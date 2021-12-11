import { useColorModeValue } from '@chakra-ui/react';
import { ComponentProps, forwardRef } from 'react';

import { Button } from '@/components/ui/Button';

type HeaderButtonProps = ComponentProps<typeof Button>;

export const HeaderButton = forwardRef<HTMLButtonElement, HeaderButtonProps>(
  (props, ref) => {
    const color = useColorModeValue('textMain', 'white');
    const hoverBg = useColorModeValue('gray.50', 'darkPrimary.500');

    return (
      <Button
        ref={ref}
        color={color}
        bg="inherit"
        borderRadius={0}
        h="full"
        py={2}
        px={3}
        fontSize="lg"
        _hover={{ bg: hoverBg }}
        {...props}
      />
    );
  }
);
