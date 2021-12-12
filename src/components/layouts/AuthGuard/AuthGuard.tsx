import { Modal, ModalOverlay } from '@chakra-ui/modal';
import { Portal } from '@chakra-ui/portal';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';

import { Loading } from '@/components/ui/Loading';
import { useAuth } from '@/services/auth/AuthProvider';
import { Paths } from '@/utils/route/paths';

let mounted = false;
export const AuthGuard: FC<{ requireLogin?: boolean }> = ({
  requireLogin = false,
  children,
}) => {
  const router = useRouter();
  const { me, isLoading } = useAuth();

  useEffect(() => {
    mounted = true;
    if (!requireLogin) return;
    if (!isLoading && !me && router.isReady) {
      router.replace(Paths.login);
    }
  }, [isLoading, me, router, requireLogin]);
  if (!requireLogin) return <>{children}</>;
  if (isLoading && mounted)
    return (
      <Portal>
        <Modal
          isOpen={true}
          onClose={() => {
            return;
          }}
        >
          <ModalOverlay>
            <Loading mt="40vh" />
          </ModalOverlay>
        </Modal>
      </Portal>
    );
  if (me) return <>{children}</>;
  return null;
};
