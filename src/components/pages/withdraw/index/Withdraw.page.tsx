import { ListItem, Text, UnorderedList } from '@chakra-ui/layout';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  ModalFooter,
  ModalBody,
  ModalHeader,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { ChangeEventHandler, FC, useState } from 'react';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Loading } from '@/components/ui/Loading';
import { toast } from '@/lib/chakraUI/theme';
import { usersRepository } from '@/repositories/users';
import { useAuthDispatch } from '@/services/auth/AuthProvider';

export const WithdrawPage: FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { signOut } = useAuthDispatch();
  const [approvalMessage, setApprovalMessage] = useState('');
  const isApproved = approvalMessage === '退会する';
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setApprovalMessage(e.target.value);
  };
  const withdraw = async () => {
    if (!isApproved) return;
    setIsLoading(true);
    try {
      await usersRepository.withdraw();
      toast({ status: 'success', title: '退会処理が完了しました。' });
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
    await signOut();
  };
  return (
    <Card
      width="full"
      maxWidth="600px"
      margin="0 auto"
      borderRadius="none"
      p="4"
      display="flex"
      flexDirection="column"
      boxShadow="none"
      _hover={{ boxShadow: 'none' }}
      sx={{ gap: '1rem' }}
    >
      <Text fontSize="lg" textAlign="center">
        Tubetterを退会する
      </Text>
      <UnorderedList fontSize="sm">
        <ListItem>
          退会を行うと、ユーザーに紐づく全てのコンテンツが削除されます。
        </ListItem>
        <ListItem>
          再度登録することは可能ですが、前回登録時に作成したコンテンツは復元されません。
        </ListItem>
      </UnorderedList>
      <Button colorScheme="red" width="xs" m="0 auto" onClick={onOpen}>
        同意して退会する
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>
            <Text variant="secondary" fontSize="md">
              退会を希望する場合は、「退会する」と入力してください。
            </Text>
          </ModalHeader>
          <ModalBody display="flex" sx={{ gap: '1rem' }} flexDirection="column">
            <Input
              placeholder="退会する"
              onChange={handleChange}
              value={approvalMessage}
            />
          </ModalBody>

          <ModalFooter
            display="flex"
            sx={{ gap: '1rem' }}
            justifyContent="flex-end"
          >
            <Button onClick={onClose} colorScheme="gray" variant="outline">
              キャンセル
            </Button>
            <Button onClick={withdraw} colorScheme="red" disabled={!isApproved}>
              退会する
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {isLoading && (
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        <Modal isOpen={true} onClose={() => {}}>
          <ModalOverlay display="flex" justifyContent="center">
            <Loading />
          </ModalOverlay>
        </Modal>
      )}
    </Card>
  );
};
