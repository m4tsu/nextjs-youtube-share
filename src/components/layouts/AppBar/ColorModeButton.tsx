import { useColorMode } from '@chakra-ui/color-mode';
import Icon from '@chakra-ui/icon';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { FC, MouseEventHandler } from 'react';

import { HeaderButton } from './HeaderButton';

export const ColorModeButton: FC = () => {
  const { colorMode, toggleColorMode, setColorMode } = useColorMode();
  const isDarkMode = colorMode === 'dark';

  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    toggleColorMode();
  };
  return (
    <HeaderButton onClick={handleClick}>
      {isDarkMode ? <Icon as={SunIcon} /> : <Icon as={MoonIcon} />}
    </HeaderButton>
  );
};
