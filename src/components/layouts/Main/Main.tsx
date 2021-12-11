import { FC } from 'react';

import { Container } from '@/components/ui/Container';

export const Main: FC = ({ children }) => {
  return (
    <Container pt={10} mb={10} as="main">
      {children}
    </Container>
  );
};
