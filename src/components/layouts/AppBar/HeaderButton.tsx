import { ComponentProps, FC } from 'react';

import { Button } from '@/components/ui/Button';

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
