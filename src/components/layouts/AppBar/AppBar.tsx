import { Box, Flex, useColorModeValue, Text } from '@chakra-ui/react';
import React, { FC, useEffect, useState } from 'react';

import { AppBarMenu } from '@/components/domain/user/AppBarMenu';
import { Container } from '@/components/ui/Container';
import { Loading } from '@/components/ui/Loading';
import { Panel } from '@/components/ui/Panel';
import { useAuth } from '@/services/auth/AuthProvider';
import { User } from '@/types/domains/user';
import { Link } from '@/utils/route/Link';
import { Paths } from '@/utils/route/paths';

import { HeaderButton } from './HeaderButton';

type ComponentProps = {
  me: null | User;
  isLoading?: boolean;
};
const Component: FC<ComponentProps> = React.memo(({ me, isLoading }) => {
  const bgColor = useColorModeValue('white', 'darkPrimary.600');
  const borderColor = useColorModeValue('gray.200', 'darkPrimary.400');

  const [mounted, setMounted] = useState(false); //https://github.com/vercel/next.js/discussions/17443
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Panel
      as="nav"
      position="sticky"
      top="0"
      zIndex="sticky"
      display="flex"
      height="60px"
      bg={bgColor}
      borderBottomWidth="1px"
      borderColor={borderColor}
      p={0}
    >
      <Container
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box display="flex" alignItems="center" h="full">
          <Link
            path="/"
            chakraLinkProps={{
              h: 'full',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Text fontFamily="Ubuntu, sans-serif" fontSize="2xl">
              Tubetter
            </Text>
          </Link>
        </Box>

        {mounted && (
          <Flex h="full">
            {isLoading ? (
              <Loading />
            ) : (
              <>
                {me && (
                  <Link path={Paths.newPost} params={{ userName: me.userName }}>
                    <HeaderButton>投稿する</HeaderButton>
                  </Link>
                )}

                {me ? (
                  <AppBarMenu me={me} />
                ) : (
                  <Link path={Paths.login}>
                    <HeaderButton>ログイン</HeaderButton>
                  </Link>
                )}
              </>
            )}
          </Flex>
        )}
      </Container>
    </Panel>
  );
});
export const AppBar: FC = () => {
  const { me, isLoading } = useAuth();
  return <Component me={me} isLoading={isLoading} />;
};
