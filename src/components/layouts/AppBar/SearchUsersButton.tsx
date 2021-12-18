import { useColorModeValue } from '@chakra-ui/color-mode';
import { SearchIcon } from '@chakra-ui/icons';
import { Flex, Text } from '@chakra-ui/layout';
import { useBreakpointValue } from '@chakra-ui/media-query';

import { Button } from '@/components/ui/Button';

type Props = {
  onClick: () => void;
};
export const SearchUsersButton = ({ onClick }: Props) => {
  const isIconOnly = useBreakpointValue({ base: true, sm: false });
  const bgColor = useColorModeValue('gray.50', 'darkPrimary.400');
  const color = useColorModeValue('gray.600', 'gray.400');

  return (
    <Button
      px={2}
      bgColor={bgColor}
      height="70%"
      margin="auto 12px"
      borderRadius="md"
      display="flex"
      onClick={onClick}
      _hover={{ bgColor: bgColor }}
      _active={{ bgColor: bgColor }}
      aria-label="ユーザー検索"
    >
      <Flex alignItems="center" sx={{ gap: '12px' }}>
        {!isIconOnly && <Text color={color}>ユーザー検索</Text>}
        <SearchIcon boxSize="20px" />
      </Flex>
    </Button>
  );
};
