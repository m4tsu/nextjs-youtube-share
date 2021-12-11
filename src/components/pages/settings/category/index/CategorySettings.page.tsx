import { useDisclosure } from '@chakra-ui/hooks';
import { DeleteIcon } from '@chakra-ui/icons';
import { Flex, Text } from '@chakra-ui/layout';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/modal';
import { FC, useState } from 'react';

import { Error } from '@/components/pages/error/Error';
import { Button } from '@/components/ui/Button';
import { Loading } from '@/components/ui/Loading';
import { Panel } from '@/components/ui/Panel';
import { toast } from '@/lib/chakraUI/theme';
import { categoryRepository, useCategories } from '@/repositories/category';
import { useAuth } from '@/services/auth/AuthProvider';
import { Category } from '@/types/domains/category';

export const CategorySettingsPage: FC = () => {
  const { me } = useAuth();
  const { data, error } = useCategories(me?.userName);
  const [selectedId, setSelectedId] = useState<Category['id'] | null>(null);

  const { onClose, onOpen, isOpen } = useDisclosure();
  const handleClick = (id: Category['id']) => () => {
    setSelectedId(id);
    onOpen();
  };

  const handleDelete = async () => {
    if (!me || !selectedId) return;
    try {
      await categoryRepository.deleteCategory(selectedId, me?.userName);
      toast({ status: 'success', title: 'カテゴリーを削除しました。' });
    } catch (e) {
      toast({ status: 'error', title: 'カテゴリーの削除に失敗しました。' });
    }
    setSelectedId(null);
    onClose();
  };

  if (error) {
    return <Error error={error.serialize()} />;
  }
  return (
    <Panel
      display="flex"
      flexDirection="column"
      sx={{ gap: '1rem' }}
      maxWidth="600px"
      margin="0 auto"
    >
      <Text variant="pageTitle">カテゴリー管理</Text>
      {!data ? (
        <Loading></Loading>
      ) : (
        data.map((category) => (
          <Flex
            key={category.id}
            p={4}
            borderBottomColor="gray.300"
            borderBottomWidth="1px"
            justifyContent="space-between"
          >
            <Text>{category.name}</Text>
            <Button
              p={0}
              borderRadius="full"
              variant="ghost"
              onClick={handleClick(category.id)}
            >
              <DeleteIcon />
            </Button>
          </Flex>
        ))
      )}
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>カテゴリーを削除する</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>このカテゴリーを削除してもよろしいですか？</Text>
          </ModalBody>
          <ModalFooter display="flex" sx={{ gap: '0.5rem' }}>
            <Button onClick={onClose} colorScheme="gray" variant="outline">
              キャンセル
            </Button>
            <Button colorScheme="red" onClick={handleDelete}>
              削除する
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Panel>
  );
};
