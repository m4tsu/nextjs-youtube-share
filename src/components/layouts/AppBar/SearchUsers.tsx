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
  // const bg = useColorModeValue('gray')
  return (
    <Button
      px={3}
      bgColor={bgColor}
      height="70%"
      margin="auto"
      borderRadius="md"
      display="flex"
      onClick={onClick}
      _hover={{ bgColor: bgColor }}
      _active={{ bgColor: bgColor }}
    >
      <Flex alignItems="center" sx={{ gap: '12px' }}>
        {!isIconOnly && <Text variant="secondary">ユーザー検索</Text>}
        <SearchIcon boxSize="20px" />
      </Flex>
    </Button>
    // <Menu strategy="fixed" isLazy autoSelect={false} closeOnSelect={false}>
    //   <Button

    //   />
    //   <MenuButton
    //     px={3}
    //     // _hover={{ bgColor: hoverBg }}
    //     bg={bg}
    //     height="80%"
    //     margin="auto"
    //     borderRadius="md"
    //     display="flex"
    //     // _active={{ backgroundColor: 'unset' }}
    //   >
    //     <Flex alignItems="center" sx={{ gap: '12px' }}>
    //       <Text variant="secondary">ユーザー検索</Text>
    //       <SearchIcon boxSize="20px" />
    //     </Flex>
    //   </MenuButton>
    //   <Portal>
    //     <MenuList
    //       zIndex="popover"
    //       display="flex"
    //       flexDirection="column"
    //       width={width}
    //       p={0}
    //     >
    //       <MenuItem
    //         _active={{ background: 'unset' }}
    //         _focus={{ background: 'unset' }}
    //         px={0}
    //         py={2}
    //         as="div"
    //         cursor="default"
    //         closeOnSelect={false}
    //       >
    //         {/* <NotificationList /> */}
    //         <SearchUsers />
    //       </MenuItem>
    //     </MenuList>
    //   </Portal>
    // </Menu>
  );
};
