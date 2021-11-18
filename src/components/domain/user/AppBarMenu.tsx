import { Avatar } from '@chakra-ui/avatar';
import Icon from '@chakra-ui/icon';
import { SettingsIcon } from '@chakra-ui/icons';
import { Divider, Flex } from '@chakra-ui/layout';
import { Menu, MenuButton, MenuList } from '@chakra-ui/menu';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { FiLogOut } from 'react-icons/fi';

import { TabButton } from '@/components/ui/TabButton';
import { ToggleColorModeButton } from '@/components/ui/ToggleColorModeButton';
import { useAuthDispatch } from '@/services/auth/AuthProvider';
import { User } from '@/types/domains/user';
import { Link } from '@/utils/route/Link';
import { Paths } from '@/utils/route/paths';

import { UserSidePanelTabs } from './UserSidePanelTabs';
type Props = {
  me: User;
};
export const AppBarMenu: FC<Props> = ({ me }) => {
  const { signOut } = useAuthDispatch();
  const router = useRouter();
  const currentPathName = router.pathname;
  return (
    <Menu strategy="fixed">
      <MenuButton>
        <Avatar src={me.avatarUrl} boxSize="44px" />
      </MenuButton>
      <MenuList
        zIndex="popover"
        display="flex"
        flexDirection="column"
        sx={{ gap: '.5rem' }}
      >
        <UserSidePanelTabs
          userName={me.userName}
          isMe
          currentPathName={currentPathName}
        />
        <Divider />
        <Flex flexDirection="column">
          <ToggleColorModeButton />
          <Link path={Paths.settings}>
            <TabButton isActive={currentPathName === Paths.settings}>
              <Icon as={SettingsIcon} />
              設定
            </TabButton>
          </Link>
          {/* <TabButton isActive={currentPathName === Paths.settings}>
            カテゴリー管理
          </TabButton> */}
        </Flex>
        <Divider />
        <TabButton onClick={signOut}>
          <Icon as={FiLogOut} />
          ログアウト
        </TabButton>
      </MenuList>
    </Menu>
  );
};
