import { Box } from '@chakra-ui/layout';
import React, { FC } from 'react';

import { UserSidePanel } from '@/components/domain/user/UserSidePanel';
import { UserTopPanel } from '@/components/domain/user/UserTopPanel';
import { Container } from '@/components/ui/Container';

export const UserPageLayout: FC = ({ children }) => {
  return (
    <>
      <UserTopPanel />
      <Container
        position="relative"
        display="flex"
        flexDirection={{ base: 'column', lg: 'row' }}
        pt={10}
        px={6}
        sx={{ gap: '20px' }}
      >
        <Box
          as="aside"
          width="250px"
          display={{ base: 'none', lg: 'block' }}
          maxHeight="100vh"
          position={{ base: 'sticky' }}
          top={{ base: '0' }}
          zIndex="popover"
        >
          <Box position="sticky" top={{ base: '0px', lg: '30px' }}>
            <UserSidePanel />
          </Box>
        </Box>
        <Box as="main" flex="1">
          {children}
        </Box>
      </Container>
    </>
  );
};
