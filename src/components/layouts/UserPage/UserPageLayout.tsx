import { FC } from 'react';

import { UserPanel } from '@/components/domain/user/UserPanel';
import { Container } from '@/components/ui/Container';

export const UserPageLayout: FC = ({ children }) => {
  return (
    <Container
      // display="grid"
      // gridTemplateColumns={{ base: 'full', md: 'auto 200px' }}
      // gridColumnGap="24px"
      pt={6}
      // borderX="solid 1px lightgray"
      // minHeight="100vh"
    >
      <UserPanel />
      {children}
    </Container>
  );
};
