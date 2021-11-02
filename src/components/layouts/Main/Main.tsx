import { FC } from 'react';

import { Container } from '@/components/ui/Container';

export const Main: FC = ({ children }) => {
  return (
    <Container
      // display="grid"
      // gridTemplateColumns={{ base: 'full', md: 'auto 200px' }}
      // gridColumnGap="24px"
      pt={6}
      mb={10}
    >
      {children}
    </Container>
  );
};
