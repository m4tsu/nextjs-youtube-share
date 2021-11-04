import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';

import { Loading } from '@/components/ui/Loading';
import { useAuth } from '@/services/auth/AuthProvider';
import { Paths } from '@/utils/route/paths';

// let mounted = false;
export const AuthGuard: FC = ({ children }) => {
  const router = useRouter();
  const { me, isLoading } = useAuth();

  useEffect(() => {
    // mounted = true;
    if (!isLoading && !me && router.isReady) {
      router.replace(Paths.login);
    }
  }, [isLoading, me, router]);

  // if (!mounted) return null; // https://github.com/vercel/next.js/discussions/15021
  if (isLoading) return <Loading />;
  if (me) return <>{children}</>;
  return null;
};
