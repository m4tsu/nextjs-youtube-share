import { useColorModeValue } from '@chakra-ui/react';
import { ComponentProps, FC } from 'react';

import { Button } from '@/components/ui/Button';

type HeaderButtonProps = ComponentProps<typeof Button>;

export const HeaderButton: FC<HeaderButtonProps> = (props) => {
  const color = useColorModeValue('textMain', 'white');
  const hoverBg = useColorModeValue('gray.50', 'darkPrimary.500');

  return (
    <Button
      color={color}
      bg="inherit"
      borderRadius={0}
      h="full"
      py={2}
      px={4}
      fontSize="lg"
      _hover={{ bg: hoverBg }}
      {...props}
    ></Button>
  );
};
