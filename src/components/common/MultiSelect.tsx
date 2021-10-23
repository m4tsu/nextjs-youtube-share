import Creatable, { CreatableProps } from 'react-select/creatable';
import { GroupBase } from 'react-select';

export const CreatableSelect = <
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  props: CreatableProps<Option, IsMulti, Group>
) => {
  return <Creatable {...props} />;
};
