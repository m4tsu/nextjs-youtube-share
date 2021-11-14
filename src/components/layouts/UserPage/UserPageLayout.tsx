import { Box } from '@chakra-ui/layout';
import React, { FC } from 'react';

import { UserSidePanel } from '@/components/domain/user/UserSidePanel';
import { UserTopPanel } from '@/components/domain/user/UserTopPanel';
import { Container } from '@/components/ui/Container';

export const UserPageLayout: FC = ({ children }) => {
  return (
    <>
      {/* <Panel
        as="aside"
        display={{ base: 'block', lg: 'none' }}
        position="sticky"
        top="0"
        zIndex="popover"
        p={0}
        borderTopWidth="1px"
        borderBottomWidth="1px"
        borderColor="primaryDark.500"
        borderRadius="none"
      >
        <Container>
          <UserSidePanel panelProps={{ border: 'none', py: 2 }} />
        </Container>
      </Panel> */}
      <UserTopPanel />
      <Container
        position="relative"
        display="flex"
        // gridTemplateColumns={{ base: 'full', md: '300px auto' }}
        // gridColumnGap={6}
        flexDirection={{ base: 'column', lg: 'row' }}
        pt={10}
        px={6}
        // borderX="solid 1px lightgray"
        // minHeight="100vh"
        sx={{ gap: '20px' }}
      >
        {/* <UserPanel /> */}
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
