import React, { FC, useState } from 'react';
import {
  Box,
  Image,
  Img,
  useColorModeValue,
  useStyleConfig,
} from '@chakra-ui/react';
// import { HeaderRightItem } from './HeaderRightItem';
import { Container } from '@/components/common/Container';
import { useDisclosure } from '@chakra-ui/hooks';
import { Link } from '@/utils/route/Link';
import { HamburgerIcon } from '@chakra-ui/icons';
import { HeaderButton } from './HeaderButton';
import { MenuDrawer } from '../Main/MenuDrawer';
import { User } from '@/models/user';
import { useAuth } from '@/services/auth/AuthProvider';

export const headerHeight = '60px';
type ComponentProps = {
  user: null | User;
};

const Component: FC<ComponentProps> = React.memo(({ user }) => {
  // const styles = useStyleConfig('AppBar');
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  const [text, setText] = useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return (
    <Box as="nav" w="100%" bgColor="white" color="gray.700" boxShadow="xs">
      <MenuDrawer isOpen={isOpen} onClose={onClose} onToggle={onToggle} />
      <Container
        display="flex"
        height={headerHeight}
        justifyContent="space-between"
        alignItems="center"
      >
        <Box display="flex" alignItems="center" h="full">
          <HeaderButton
            borderRadius="full"
            p={2}
            mr={4}
            boxSize="45px"
            onClick={onToggle}
          >
            <HamburgerIcon
              alignItems="center"
              verticalAlign="middle"
              cursor="pointer"
              fontSize="4xl"
            />
          </HeaderButton>

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

        <Box h="full">
          <Link
            path="/search"
            chakraLinkProps={{ _hover: { textDecoration: 'none' } }}
          >
            <HeaderButton isLink>ユーザーを探す</HeaderButton>
          </Link>
          {user && (
            <Link
              path="/[user_name]/posts/new"
              params={{ user_name: user.user_name }}
            >
              <HeaderButton isLink>動画を登録する</HeaderButton>
            </Link>
          )}

          {user ? (
            <Link path="/[user_name]" params={{ user_name: user.user_name }}>
              <HeaderButton isLink>
                <Image
                  src={user.photo_url}
                  borderRadius="full"
                  boxSize="45px"
                />
              </HeaderButton>
            </Link>
          ) : (
            <Link path="/login">
              <HeaderButton>ログイン</HeaderButton>
            </Link>
          )}
        </Box>
      </Container>
    </Box>
  );
});
export const AppBar: FC = () => {
  const { me } = useAuth();
  return <Component user={me} />;
};
