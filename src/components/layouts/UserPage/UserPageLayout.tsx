import { Container } from '@/components/common/Container';
import { UserPanel } from '@/components/pages/users/UserPanel';
import { FC } from 'react';

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
