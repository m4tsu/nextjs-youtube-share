import { useColorMode } from '@chakra-ui/color-mode';
import { GroupBase, StylesConfig } from 'react-select';
import Creatable, { CreatableProps } from 'react-select/creatable';

import { colors } from '@/lib/chakraUI/theme';

export const CreatableSelect = <
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  props: CreatableProps<Option, IsMulti, Group>
) => {
  const { colorMode } = useColorMode();
  const bg = colorMode === 'light' ? 'white' : colors.darkPrimary[600];
  const baseStyle: StylesConfig<Option, IsMulti, Group> = {
    menuList: () => ({ color: colors.textMain }),
    control: (provided, _) => ({
      ...provided,
      background: bg,
      borderColor: 'inherit',
    }),
    input: (provided, _) => ({ ...provided, color: 'inherit' }),
    multiValue: (provided, _) => ({
      ...provided,
      background: '#3182ce',
      color: 'white',
    }),
    multiValueLabel: (provided, _) => ({
      ...provided,
      color: 'white',
    }),
    multiValueRemove: (provided, _) => ({
      ...provided,
      ':hover': {
        background: '#63b3e',
        color: 'white',
      },
    }),
  };
  return <Creatable styles={baseStyle} {...props} />;
};
