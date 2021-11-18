import { Box, Flex, Img, useColorModeValue } from '@chakra-ui/react';
import React, { FC } from 'react';

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

  return (
    <Panel
      as="nav"
      display="flex"
      height="60px"
      bg={bgColor}
      // color="gray.700"
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
            <Img src="/logo-white.png" h="80%" />
          </Link>
        </Box>

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
                // <Link path={Paths.posts} params={{ userName: me.userName }}>
                //   <HeaderButton isLink>
                //     <Avatar src={me.avatarUrl} boxSize="44px" />
                //   </HeaderButton>
                // </Link>
                <AppBarMenu me={me} />
              ) : (
                <Link path={Paths.login}>
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
  return <Component me={me} isLoading={isLoading} />;
};
