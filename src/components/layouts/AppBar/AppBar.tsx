import { Avatar, Box, Flex, Img, useColorModeValue } from '@chakra-ui/react';
import React, { FC } from 'react';

import { Container } from '@/components/ui/Container';
import { Loading } from '@/components/ui/Loading';
import { Panel } from '@/components/ui/Panel';
import { useAuth } from '@/services/auth/AuthProvider';
import { User } from '@/types/domains/user';
import { Link } from '@/utils/route/Link';
import { Paths } from '@/utils/route/paths';

import { HeaderButton } from './HeaderButton';

type ComponentProps = {
  user: null | User;
  isLoading?: boolean;
};
const Component: FC<ComponentProps> = React.memo(({ user, isLoading }) => {
  const bgColor = useColorModeValue('white', 'darkPrimary.600');

  return (
    <Panel as="nav" height="60px" bg={bgColor} color="gray.700" p={0}>
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
            <Img src="/logo-white.png" h="80%" />
          </Link>
        </Box>

        <Flex h="full">
          {isLoading ? (
            <Loading />
          ) : (
            <>
              {user && (
                <Link path={Paths.newPost} params={{ userName: user.userName }}>
                  <HeaderButton>投稿する</HeaderButton>
                </Link>
              )}

              {user ? (
                <Link path={Paths.posts} params={{ userName: user.userName }}>
                  <HeaderButton isLink>
                    <Avatar src={user.avatarUrl} boxSize="44px" />
                  </HeaderButton>
                </Link>
              ) : (
                <Link path="/login">
                  <HeaderButton>ログイン</HeaderButton>
                </Link>
              )}
            </>
          )}
        </Flex>
      </Container>
    </Panel>
  );
});
export const AppBar: FC = () => {
  const { me, isLoading } = useAuth();
  return <Component user={me} isLoading={isLoading} />;
};
