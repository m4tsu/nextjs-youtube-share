import { GroupBase } from 'react-select';
import Creatable, { CreatableProps } from 'react-select/creatable';

export const CreatableSelect = <
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  props: CreatableProps<Option, IsMulti, Group>
) => {
  return <Creatable {...props} />;
};
