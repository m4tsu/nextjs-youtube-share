import { useColorMode } from '@chakra-ui/color-mode';
import { RefAttributes, useMemo } from 'react';
import ReactSelect, { GroupBase, StylesConfig } from 'react-select';
import SelectType from 'react-select/dist/declarations/src/Select';
import { StateManagerProps } from 'react-select/dist/declarations/src/stateManager';

import { colors } from '@/lib/chakraUI/theme';

export const Select = <
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  props: StateManagerProps<Option, IsMulti, Group> &
    RefAttributes<SelectType<Option, IsMulti, Group>>
) => {
  const { colorMode } = useColorMode();
  const bg = colorMode === 'light' ? 'white' : colors.darkPrimary[600];
  const valueColor = colorMode === 'light' ? colors.textMain : 'white';
  const placeholderColor = colors.textSub;
  const baseStyle: StylesConfig<Option, IsMulti, Group> = useMemo(
    () => ({
      menu: (provided) => ({
        ...provided,
        zIndex: 5,
      }),
      menuList: (provided) => ({
        ...provided,
        color: colors.textMain,
        zIndex: 5,
      }),
      control: (provided, _) => ({
        ...provided,
        background: bg,
        borderColor: 'inherit',
      }),
      input: (provided, _) => ({ ...provided, color: 'inherit' }),
      singleValue: (provided, _) => ({
        ...provided,
        color: valueColor,
      }),
      placeholder: (provided, _) => ({
        ...provided,
        color: placeholderColor,
      }),
    }),
    [bg, valueColor, placeholderColor]
  );
  return <ReactSelect {...props} styles={baseStyle} />;
};
