import { useColorModeValue } from '@chakra-ui/color-mode';
import { Menu, MenuButton, MenuList } from '@chakra-ui/react';
import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import React, { FC } from 'react';

import { Container } from '@/components/ui/Container';
import { Panel } from '@/components/ui/Panel';
import { useAuth } from '@/services/auth/AuthProvider';

import { UserSidePanel } from './UserSidePanel';
import { UserSidePanelTabs } from './UserSidePanelTabs';

type ComponentProps = {
  currentPathName: string;
  userName: string;
  isMe: boolean;
};
const Component: FC<ComponentProps> = ({ userName, currentPathName, isMe }) => {
  const bg = useColorModeValue('white', 'darkPrimary.600');
  const hoverBg = useColorModeValue('gray.50', 'darkPrimary.500');
  return (
    <Menu strategy="fixed">
      <MenuButton
        as={Panel}
        display={{ base: 'block', lg: 'none' }}
        position="sticky"
        top="0"
        zIndex="sticky"
        p={0}
        borderTopWidth="1px"
        borderBottomWidth="1px"
        borderColor="primaryDark.500"
        borderRadius="none"
        cursor="pointer"
        bg={bg}
        css={css`
          > span {
            pointer-events: unset;
          }
        `}
        _hover={{ bg: hoverBg }}
      >
        <Container>
          <UserSidePanel
            panelProps={{ border: 'none', py: 2, bg: 'inherit' }}
          />
        </Container>
      </MenuButton>
      <MenuList zIndex="popover">
        <UserSidePanelTabs
          isMe={isMe}
          userName={userName}
          currentPathName={currentPathName}
        />
      </MenuList>
    </Menu>
  );
};

export const UserTopPanel: FC = () => {
  const router = useRouter();
  const userName = router.query.userName as string;
  const currentPathName = router.pathname;
  const { me } = useAuth();
  const isMe = me ? me.userName === userName : false;
  return (
    <Component
      userName={userName}
      currentPathName={currentPathName}
      isMe={isMe}
    />
  );
};
