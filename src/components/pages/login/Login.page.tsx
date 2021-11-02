import { FC } from 'react';

import { Button } from '@/components/ui/Button';
import { Panel } from '@/components/ui/Panel';
import { useAuthDispatch } from '@/services/auth/AuthProvider';

export const LoginPage: FC = () => {
  const { signIn } = useAuthDispatch();
  return (
    <Panel>
      <Button colorScheme="twitter" onClick={signIn}>
        Twitterアカウントでログイン
      </Button>
    </Panel>
  );
};
