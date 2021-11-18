import Icon from '@chakra-ui/icon';
import { MoonIcon } from '@chakra-ui/icons';
import { Flex } from '@chakra-ui/layout';
import { useColorMode } from '@chakra-ui/react';
import { Switch } from '@chakra-ui/switch';
import React, { FC, MouseEventHandler } from 'react';

import { TabButton } from '@/components/ui/TabButton';

export const ToggleColorModeButton: FC = () => {
  const { colorMode, toggleColorMode, setColorMode } = useColorMode();
  const isDarkMode = colorMode === 'dark';

  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    toggleColorMode();
  };

  return (
    <TabButton justifyContent="space-between" onClick={handleClick}>
      <Flex alignItems="center" sx={{ gap: '.5rem' }}>
        <Icon as={MoonIcon} />
        ダークテーマ
      </Flex>
      <Switch isChecked={isDarkMode} isReadOnly />
    </TabButton>
  );
};
