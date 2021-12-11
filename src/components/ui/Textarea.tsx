import { useColorModeValue } from '@chakra-ui/color-mode';
import { forwardRef } from '@chakra-ui/system';
import { Textarea as ChakraTextarea, TextareaProps } from '@chakra-ui/textarea';

export const Textarea = forwardRef<TextareaProps, 'textarea'>((props, ref) => {
  const borderColor = useColorModeValue('gray.300', 'darkPrimary.300');
  const hoverBorderColor = useColorModeValue('gray.400', 'darkPrimary.200');
  const color = useColorModeValue('gray.700', 'gray.200');
  return (
    <ChakraTextarea
      borderColor={borderColor}
      color={color}
      _hover={{ borderColor: hoverBorderColor }}
      ref={ref}
      {...props}
    />
  );
});
