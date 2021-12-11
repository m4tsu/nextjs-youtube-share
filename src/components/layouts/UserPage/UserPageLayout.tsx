import { Box } from '@chakra-ui/layout';
import { useBreakpointValue } from '@chakra-ui/media-query';
import React, { FC } from 'react';

import { UserSidePanel } from '@/components/domain/user/UserSidePanel';
import { UserTopPanel } from '@/components/domain/user/UserTopPanel';
import { Container } from '@/components/ui/Container';

export const UserPageLayout: FC = ({ children }) => {
  const shouldTopPanelShown = useBreakpointValue({ base: true, lg: false });
  const shouldSidePanelShown = useBreakpointValue({ base: false, lg: true });
  return (
    <>
      {shouldTopPanelShown && <UserTopPanel />}

      <Container
        position="relative"
        display="flex"
        flexDirection={{ base: 'column', lg: 'row' }}
        pt={10}
        px={6}
        sx={{ gap: '20px' }}
      >
        {shouldSidePanelShown && (
          <Box
            as="aside"
            width="250px"
            maxHeight="100vh"
            position={{ base: 'sticky' }}
            top={{ base: '0' }}
            zIndex="sticky"
          >
            <Box position="sticky" top={{ lg: '100px' }}>
              <UserSidePanel />
            </Box>
          </Box>
        )}
        <Box as="main" flex="1">
          {children}
        </Box>
      </Container>
    </>
  );
};
