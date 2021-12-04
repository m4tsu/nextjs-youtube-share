import { useColorModeValue } from '@chakra-ui/color-mode';
import { Menu, MenuButton, MenuList, Portal } from '@chakra-ui/react';
import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { z } from 'zod';

import { Container } from '@/components/ui/Container';
import { Panel } from '@/components/ui/Panel';
import { useAuth } from '@/services/auth/AuthProvider';
import { Paths } from '@/utils/route/paths';

import { UserSidePanel } from './UserSidePanel';
import { UserSidePanelTabs } from './UserSidePanelTabs';

type ComponentProps = {
  currentPathName: string;
  userName?: string;
  isMe: boolean;
};
const Component: FC<ComponentProps> = ({ userName, currentPathName, isMe }) => {
  const bg = useColorModeValue('white', 'darkPrimary.600');
  const hoverBg = useColorModeValue('gray.50', 'darkPrimary.500');
  return (
    <Menu strategy="fixed" autoSelect={false}>
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
      <Portal>
        <MenuList zIndex="popover">
          {userName && (
            <UserSidePanelTabs
              asMenu
              isMe={isMe}
              userName={userName}
              currentPathName={currentPathName}
            />
          )}
        </MenuList>
      </Portal>
    </Menu>
  );
};

const querySchema = z.object({ userName: z.string().optional() });
export const UserTopPanel: FC = () => {
  console.log('render!!');
  const router = useRouter();
  const { userName } = querySchema.parse(router.query);
  const currentPathName = router.pathname;
  const { me } = useAuth();
  const isMyHomePage = currentPathName === Paths.home;
  const isMe = me ? me.userName === userName : false;
  return (
    <Component
      userName={isMyHomePage ? me?.userName : userName}
      currentPathName={currentPathName}
      isMe={isMe}
    />
  );
};
