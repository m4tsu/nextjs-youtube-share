import { useColorModeValue } from '@chakra-ui/color-mode';
import { Menu, MenuButton, MenuList, Portal } from '@chakra-ui/react';
import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import React, { FC, memo } from 'react';
import { z } from 'zod';

import { Container } from '@/components/ui/Container';
import { Panel } from '@/components/ui/Panel';
import { useAuth } from '@/services/auth/AuthProvider';
import { Paths } from '@/utils/route/paths';

import { UserSidePanel } from './UserSidePanel';
import { UserSidePanelTabs } from './UserSidePanelTabs';

type ComponentProps = {
  userName?: string;
};
const Component: FC<ComponentProps> = memo(({ userName }) => {
  const bg = useColorModeValue('white', 'darkPrimary.600');
  const borderColor = useColorModeValue('gray.200', 'darkPrimary.400');
  const hoverBg = useColorModeValue('gray.50', 'darkPrimary.500');
  return (
    <Menu strategy="fixed" autoSelect={false}>
      <MenuButton
        as={Panel}
        display={{ base: 'block', lg: 'none' }}
        position="sticky"
        top="60px"
        zIndex="sticky"
        p={0}
        borderBottomWidth="1px"
        borderColor={borderColor}
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
          {userName && <UserSidePanelTabs asMenu userName={userName} />}
        </MenuList>
      </Portal>
    </Menu>
  );
});

const querySchema = z.object({ userName: z.string().optional() });
export const UserTopPanel: FC = () => {
  const router = useRouter();
  const { userName } = querySchema.parse(router.query);
  const currentPathName = router.pathname;
  const { me } = useAuth();
  const isMyHomePage = currentPathName === Paths.home;
  return <Component userName={isMyHomePage ? me?.userName : userName} />;
};
