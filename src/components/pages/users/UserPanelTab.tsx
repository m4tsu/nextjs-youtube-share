import { Button } from '@/components/common/Button';
import { Link } from '@/utils/route/Link';
import { Paths } from '@/utils/route/paths';
import { Flex } from '@chakra-ui/layout';
import { FC } from 'react';

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
  user_name: string;
};

export const UserPanelTab: FC<UserPanelTabProps> = ({
  currentPathName,
  user_name,
}) => {
  return (
    <Flex
      justifyContent="flex-start"
      borderBottomWidth="2px"
      borderBottomStyle="solid"
    >
      <Link path={Paths.posts} params={{ user_name }}>
        <TabButton isActive={currentPathName === Paths.posts}>投稿</TabButton>
      </Link>
      <Link path={Paths.mylist} params={{ user_name }}>
        <TabButton isActive={currentPathName === Paths.mylist}>
          マイリスト
        </TabButton>
      </Link>
      <Link path={Paths.favorites} params={{ user_name }}>
        <TabButton isActive={currentPathName === Paths.favorites}>
          お気に入り
        </TabButton>
      </Link>
    </Flex>
  );
};
