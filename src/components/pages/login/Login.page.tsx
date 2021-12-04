import { LightMode } from '@chakra-ui/color-mode';
import { Box, Text } from '@chakra-ui/layout';
import { FC } from 'react';
import { FaTwitter } from 'react-icons/fa';

import { Button } from '@/components/ui/Button';
import { Panel } from '@/components/ui/Panel';
import { useAuthDispatch } from '@/services/auth/AuthProvider';

export const LoginPage: FC = () => {
  const { signIn } = useAuthDispatch();
  return (
    <Panel display="flex" flexDirection="column" sx={{ gap: '1rem' }}>
      <Box margin="0 auto">
        <LightMode>
          <Button
            colorScheme="twitter"
            onClick={signIn}
            leftIcon={<FaTwitter />}
          >
            Twitterアカウントでログイン
          </Button>
        </LightMode>
      </Box>
      <Box>
        <Text>ログインするといするといいことあるよ！</Text>
      </Box>
    </Panel>
  );
};
