import { Avatar } from '@chakra-ui/avatar';
import Icon from '@chakra-ui/icon';
import { SettingsIcon } from '@chakra-ui/icons';
import { Divider, Flex } from '@chakra-ui/layout';
import { Menu, MenuButton, MenuList } from '@chakra-ui/menu';
import { Portal, useColorModeValue } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { FC, memo } from 'react';
import { AiFillTags } from 'react-icons/ai';
import { FiLogOut } from 'react-icons/fi';

import { TabButton } from '@/components/ui/TabButton';
import { ToggleColorModeMenuButton } from '@/components/ui/ToggleColorModeMenuButton';
import { useAuthDispatch } from '@/services/auth/AuthProvider';
import { User } from '@/types/domains/user';
import { Link } from '@/utils/route/Link';
import { Paths } from '@/utils/route/paths';

import { UserSidePanelTabs } from './UserSidePanelTabs';
type Props = {
  me: User;
};
const Component: FC<Props> = ({ me }) => {
  const { signOut } = useAuthDispatch();
  const router = useRouter();
  const currentPathName = router.pathname;
  const hoverBg = useColorModeValue('gray.50', 'darkPrimary.500');

  return (
    <Menu strategy="fixed" isLazy autoSelect={false}>
      <MenuButton
        _hover={{ bgColor: hoverBg }}
        px={3}
        aria-label="ユーザーメニュー"
      >
        <Avatar
          src={me.avatarUrl}
          boxSize="44px"
          name="ログイン中のユーザーのアイコン"
        />
      </MenuButton>
      <Portal>
        <MenuList
          zIndex="popover"
          display="flex"
          flexDirection="column"
          sx={{ gap: '.5rem' }}
        >
          <UserSidePanelTabs userName={me.userName} asMenu />
          <Divider />
          <Flex flexDirection="column">
            <ToggleColorModeMenuButton />
            <Link path={Paths.settings}>
              <TabButton
                isActive={currentPathName === Paths.settings}
                asMenuItem
              >
                <Icon as={SettingsIcon} />
                設定
              </TabButton>
            </Link>

            <Link path={Paths.categorySettings}>
              <TabButton isActive={currentPathName === Paths.categorySettings}>
                <Icon as={AiFillTags} />
                カテゴリー管理
              </TabButton>
            </Link>
          </Flex>
          <Divider />
          <TabButton onClick={signOut} asMenuItem>
            <Icon as={FiLogOut} />
            ログアウト
          </TabButton>
        </MenuList>
      </Portal>
    </Menu>
  );
};

export const AppBarMenu = memo(Component);
