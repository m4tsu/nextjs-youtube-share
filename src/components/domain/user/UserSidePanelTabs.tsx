import { ButtonProps } from '@chakra-ui/button';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { Flex, FlexProps } from '@chakra-ui/layout';
import { Icon } from '@chakra-ui/react';
import { FC } from 'react';
import { AiOutlineStar } from 'react-icons/ai';
import { FiUsers } from 'react-icons/fi';
import { MdPlaylistPlay } from 'react-icons/md';

import { Button } from '@/components/ui/Button';
import { Link } from '@/utils/route/Link';
import { Paths } from '@/utils/route/paths';

const TabButton: FC<{ isActive?: boolean } & ButtonProps> = ({
  isActive,
  ...props
}) => {
  const color = useColorModeValue('textMain', 'white');
  const bgColor = useColorModeValue('gray.100', 'darkPrimary.500');
  return (
    <Button
      width="full"
      variant="link"
      borderRadius="sm"
      lineHeight="unset"
      color={color}
      fontWeight={isActive ? 'bold' : 'thin'}
      fontSize="lg"
      py={1}
      pl={1}
      justifyContent="flex-start"
      bgColor={isActive ? bgColor : 'inherit'}
      _hover={{
        textDecoration: 'none',
        bgColor,
      }}
      isLink
      sx={{ gap: '.5rem' }}
      {...props}
    />
  );
};

type Props = {
  currentPathName: string;
  userName: string;
} & FlexProps;

export const UserSidePanelTabs: FC<Props> = ({
  currentPathName,
  userName,
  ...props
}) => {
  return (
    <Flex flexDirection="column" {...props}>
      <Link path={Paths.posts} params={{ userName }}>
        <TabButton isActive={currentPathName === Paths.posts}>
          <Icon as={MdPlaylistPlay} />
          投稿
        </TabButton>
      </Link>
      <Link path={Paths.favorites} params={{ userName }}>
        <TabButton isActive={currentPathName === Paths.favorites}>
          <Icon as={AiOutlineStar} />
          お気に入り
        </TabButton>
      </Link>
      <Link path={Paths.following} params={{ userName }}>
        <TabButton isActive={currentPathName === Paths.following}>
          <Icon as={FiUsers} />
          フォロー中
        </TabButton>
      </Link>
      <Link path={Paths.followers} params={{ userName }}>
        <TabButton isActive={currentPathName === Paths.followers}>
          <Icon as={FiUsers} />
          フォロワー
        </TabButton>
      </Link>
    </Flex>
  );
};
