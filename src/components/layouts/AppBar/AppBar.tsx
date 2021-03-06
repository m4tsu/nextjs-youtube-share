import { Icon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  useColorModeValue,
  Text,
  Tooltip,
  useDisclosure,
  Portal,
  useBreakpointValue,
  // Image,
} from '@chakra-ui/react';
import Image from 'next/image';
import React, { FC, useEffect, useState } from 'react';
import { MdPlaylistAdd } from 'react-icons/md';

import { AppBarMenu } from '@/components/domain/user/AppBarMenu';
import { Container } from '@/components/ui/Container';
import { Panel } from '@/components/ui/Panel';
import { useAuth } from '@/services/auth/AuthProvider';
import { User } from '@/types/domains/user';
import { Link } from '@/utils/route/Link';
import { Paths } from '@/utils/route/paths';

import { ColorModeButton } from './ColorModeButton';
import { HeaderButton } from './HeaderButton';
import { Notifications } from './Notifications';
import { SearchUsersButton } from './SearchUsersButton';
import { SearchUsersModal } from './SearchUsersModal';

type ComponentProps = {
  me: null | User;
  isLoading?: boolean;
};
const Component: FC<ComponentProps> = React.memo(({ me, isLoading }) => {
  const bgColor = useColorModeValue('white', 'darkPrimary.600');
  const borderColor = useColorModeValue('gray.200', 'darkPrimary.400');
  const hoverBg = useColorModeValue('gray.50', 'darkPrimary.500');
  const isMobile = useBreakpointValue({ base: true, sm: false });
  const { isOpen, onOpen, onClose } = useDisclosure();

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
        <Box
          display="flex"
          alignItems="center"
          h="full"
          px={2}
          _hover={{ bgColor: hoverBg }}
        >
          <Link
            path="/"
            chakraLinkProps={{
              h: 'full',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {isMobile ? (
              <Flex borderRadius="md" alignItems="center">
                <Image
                  src="/tubetter.png"
                  width={40}
                  height={40}
                  alt="tubetter-logo"
                />
              </Flex>
            ) : (
              <Text fontFamily="Ubuntu, sans-serif" fontSize="2xl">
                Tubetter
              </Text>
            )}
          </Link>
        </Box>
        {mounted && (
          <Flex h="full">
            <SearchUsersButton onClick={onOpen} />

            {isLoading ? (
              <></>
            ) : (
              <>
                {me && (
                  <Link path={Paths.newPost} params={{ userName: me.userName }}>
                    <Tooltip label="????????????">
                      <HeaderButton aria-label="??????????????????????????????">
                        <Icon
                          as={MdPlaylistAdd}
                          boxSize="30px"
                          name="??????????????????????????????"
                        />
                      </HeaderButton>
                    </Tooltip>
                  </Link>
                )}

                {me ? (
                  <>
                    <Notifications me={me} />
                    <AppBarMenu me={me} />
                  </>
                ) : (
                  <>
                    <ColorModeButton />
                    <Link path={Paths.login}>
                      <Tooltip label="????????????">
                        <HeaderButton aria-label="??????????????????????????????">
                          <Icon
                            as={MdPlaylistAdd}
                            boxSize="30px"
                            name="??????????????????????????????"
                          />
                        </HeaderButton>
                      </Tooltip>
                    </Link>
                    <Link path={Paths.login}>
                      <HeaderButton>????????????</HeaderButton>
                    </Link>
                  </>
                )}
              </>
            )}
          </Flex>
        )}
      </Container>
      <Portal>
        <SearchUsersModal isOpen={isOpen} onClose={onClose} />
      </Portal>
    </Panel>
  );
});
export const AppBar: FC = () => {
  const { me, isLoading } = useAuth();
  return <Component me={me} isLoading={isLoading} />;
};
