import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';

import { useAuth } from '@/services/auth/AuthProvider';
import { Paths } from '@/utils/route/paths';

export const AuthGuard: FC = ({ children }) => {
  const router = useRouter();
  const { me, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !me && router.isReady) {
      router.replace(Paths.login);
    }
  }, [isLoading, me, router]);

  if (isLoading) return null;
  if (me) return <>{children}</>;
  return null;
};
