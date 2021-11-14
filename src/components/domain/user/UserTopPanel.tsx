import { useColorModeValue } from '@chakra-ui/color-mode';
import { Menu, MenuButton, MenuList } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { FC } from 'react';

import { Container } from '@/components/ui/Container';
import { Panel } from '@/components/ui/Panel';

import { UserSidePanel } from './UserSidePanel';
import { UserSidePanelTabs } from './UserSidePanelTabs';

export const UserTopPanel: FC = () => {
  const bg = useColorModeValue('white', 'darkPrimary.600');
  const hoverBg = useColorModeValue('gray.50', 'darkPrimary.500');
  const router = useRouter();
  const userName = router.query.userName as string;
  const currentPathName = router.pathname;
  return (
    <Menu strategy="fixed">
      <MenuButton
        as={Panel}
        display={{ base: 'block', lg: 'none' }}
        position="sticky"
        top="0"
        zIndex="popover"
        p={0}
        borderTopWidth="1px"
        borderBottomWidth="1px"
        borderColor="primaryDark.500"
        borderRadius="none"
        cursor="pointer"
        bg={bg}
        _hover={{ bg: hoverBg }}
      >
        <Container>
          <UserSidePanel
            panelProps={{ border: 'none', py: 2, bg: 'inherit' }}
          />
        </Container>
      </MenuButton>
      <MenuList>
        <UserSidePanelTabs
          userName={userName}
          currentPathName={currentPathName}
        />
      </MenuList>
    </Menu>
  );
};
