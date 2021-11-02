import { Flex } from '@chakra-ui/layout';
import { FC } from 'react';

import { Button } from '@/components/ui/Button';
import { Link } from '@/utils/route/Link';
import { Paths } from '@/utils/route/paths';

const TabButton: FC<{ isActive?: boolean }> = ({ isActive, children }) => {
  return isActive ? (
    <Button
      variant="link"
      p={4}
      py={2}
      mb="-2px"
      borderRadius="none"
      colorScheme="primary"
      borderBottomWidth="2px"
      borderBottomStyle="solid"
      borderBottomColor="currentColor"
      _hover={{ textDecoration: 'none' }}
      isLink
    >
      {children}
    </Button>
  ) : (
    <Button
      variant="link"
      p={4}
      py={2}
      _hover={{ textDecoration: 'none' }}
      isLink
    >
      {children}
    </Button>
  );
};

type UserPanelTabProps = {
  currentPathName: string;
  userName: string;
};

export const UserPanelTab: FC<UserPanelTabProps> = ({
  currentPathName,
  userName,
}) => {
  return (
    <Flex
      justifyContent="flex-start"
      borderBottomWidth="2px"
      borderBottomStyle="solid"
    >
      <Link path={Paths.posts} params={{ userName }}>
        <TabButton isActive={currentPathName === Paths.posts}>投稿</TabButton>
      </Link>
      <Link path={Paths.mylist} params={{ userName }}>
        <TabButton isActive={currentPathName === Paths.mylist}>
          マイリスト
        </TabButton>
      </Link>
      <Link path={Paths.favorites} params={{ userName }}>
        <TabButton isActive={currentPathName === Paths.favorites}>
          お気に入り
        </TabButton>
      </Link>
    </Flex>
  );
};
