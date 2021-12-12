import { SearchIcon } from '@chakra-ui/icons';
import { InputGroup, InputRightElement } from '@chakra-ui/input';
import { Flex, Text } from '@chakra-ui/layout';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal';
import { ChangeEvent, memo, useState } from 'react';

import { UserCard } from '@/components/domain/user/UserCard';
import { Error } from '@/components/pages/error/Error';
import { Input } from '@/components/ui/Input';
import { Loading } from '@/components/ui/Loading';
import { useSearchUsers } from '@/repositories/users';
import { User } from '@/types/domains/user';
import { useDebounce } from '@/utils/useDebounce';

type UsersListProps = {
  users: User[];
};
const UsersList = memo(({ users }: UsersListProps) => {
  return (
    <Flex flexDirection="column" sx={{ gap: '1rem' }}>
      {users.map((user) => (
        <UserCard user={user} key={user.id} />
      ))}
    </Flex>
  );
});

type Props = {
  isOpen: boolean;
  onClose: () => void;
};
export const SearchUsersModal = ({ isOpen, onClose }: Props) => {
  const [input, setInput] = useState<string>('');
  const debouncedInput = useDebounce(input, 700);
  const { data: users, error, isValidating } = useSearchUsers(debouncedInput);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  if (error) return <Error error={error} />;
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <InputGroup>
            <Input
              id="userName"
              name="userName"
              placeholder="ユーザー検索"
              value={input}
              onChange={handleChange}
            />
            <InputRightElement>
              <SearchIcon />
            </InputRightElement>
          </InputGroup>
        </ModalHeader>
        <ModalBody>
          {users ? (
            users.length ? (
              <UsersList users={users} />
            ) : (
              <Text textAlign="center">ユーザーが見つかりません。</Text>
            )
          ) : (
            debouncedInput && <Loading />
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
