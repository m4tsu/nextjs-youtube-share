import { useColorModeValue } from '@chakra-ui/color-mode';
import { Input as ChakraInput, InputProps } from '@chakra-ui/input';
import { forwardRef } from '@chakra-ui/system';

export const Input = forwardRef<InputProps, 'input'>((props, ref) => {
  const borderColor = useColorModeValue('gray.300', 'darkPrimary.300');
  const hoverBorderColor = useColorModeValue('gray.400', 'darkPrimary.200');
  const color = useColorModeValue('gray.700', 'gray.200');
  return (
    <ChakraInput
      borderColor={borderColor}
      color={color}
      _hover={{ borderColor: hoverBorderColor }}
      // focusBorderColor={focusBorderColor}
      ref={ref}
      {...props}
    />
  );
});
