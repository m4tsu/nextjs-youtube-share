import { Modal, ModalOverlay } from '@chakra-ui/modal';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { z } from 'zod';

import { Paths } from '@/utils/route/paths';

import { NoResource } from '../NoResource';

import { FavoritesPageModalContent } from './FavoritesPageModalContent';

const Content: FC<{ route: string }> = ({ route }) => {
  switch (route) {
    case Paths.favoriteUsers: {
      return <FavoritesPageModalContent />;
    }
    default: {
      return <NoResource resourceName="ページ" />;
    }
  }
};

const querySchema = z.object({
  route: z.string(),
});
export const ModalPage: FC = () => {
  const router = useRouter();
  const { query } = router;
  const { route } = querySchema.parse(query);
  const handleCloseModal = () => {
    router.back();
  };

  return (
    <Modal isOpen={true} onClose={handleCloseModal}>
      <ModalOverlay />
      <Content route={route} />
    </Modal>
  );
};
