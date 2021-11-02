import { Button } from '@chakra-ui/button';
import { HamburgerIcon } from '@chakra-ui/icons';
import { Img } from '@chakra-ui/image';
import { Box, StackDivider, VStack } from '@chakra-ui/layout';
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from '@chakra-ui/modal';
import { FC } from 'react';

import { Link } from '@/utils/route/Link';
import { Paths } from '@/utils/route/paths';

import { headerHeight } from '../AppBar/AppBar';
import { HeaderButton } from '../AppBar/HeaderButton';

type Props = {
  onClose: () => void;
  onToggle: () => void;
  isOpen: boolean;
};

const MenuButton: FC = ({ children }) => {
  return (
    <Button
      variant="solid"
      border="none"
      bg="inherit"
      width="100%"
      justifyContent="normal"
      borderRadius="0"
    >
      {children}
    </Button>
  );
};

export const MenuDrawer: FC<Props> = ({ onClose, isOpen, onToggle }) => {
  return (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader
          boxShadow="sm"
          minHeight={headerHeight}
          padding={'0 0 0 24px'}
        >
          <Box display="flex" alignItems="center" h="full">
            <HeaderButton
              borderRadius="full"
              p={2}
              mr={4}
              boxSize="45px"
              onClick={onToggle}
            >
              <HamburgerIcon
                // color="white"
                alignItems="center"
                verticalAlign="middle"
                cursor="pointer"
                fontSize="4xl"
              />
            </HeaderButton>

            <Link
              path="/"
              chakraLinkProps={{
                h: 'full',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Img src="/logo-white.png" h="80%" />
            </Link>
          </Box>
        </DrawerHeader>
        <DrawerBody mt="2">
          <VStack
            spacing={2}
            align="stretch"
            divider={<StackDivider borderColor="gray.200" />}
          >
            <Box>
              <Link
                path="/"
                chakraLinkProps={{
                  width: '100%',
                  display: 'block',
                }}
              >
                <MenuButton>ホーム</MenuButton>
              </Link>
            </Box>
            <Box>
              <Link
                path={Paths.following}
                params={{ userName: 2 }}
                chakraLinkProps={{ width: '100%', pt: '2', pb: '2' }}
              >
                <MenuButton>フォロー</MenuButton>
              </Link>
            </Box>
            <Box>
              <Link
                path={Paths.followers}
                params={{ userName: 2 }}
                chakraLinkProps={{ width: '100%', pt: '2', pb: '2' }}
              >
                <MenuButton>フォロワー</MenuButton>
              </Link>
            </Box>
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
