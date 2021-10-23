import { Button } from '@/components/common/Button';
import { ButtonProps } from '@chakra-ui/button';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { ComponentWithAs } from '@chakra-ui/system';
import { ComponentProps, FC } from 'react';

type HeaderButtonProps = ComponentProps<typeof Button>;

export const HeaderButton: FC<HeaderButtonProps> = (props) => {
  // const bg = useColorModeValue('primary.500', 'primaryDark.700');
  // const hover = useColorModeValue('primary.600', 'primaryDark.600');
  return (
    <Button
      bgColor="white"
      // _hover={{ bgColor: hover }}
      borderRadius={0}
      h="full"
      {...props}
    ></Button>
  );
};
