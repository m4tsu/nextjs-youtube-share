import { Flex, FlexProps } from '@chakra-ui/layout';
import { Icon } from '@chakra-ui/react';
import { FC } from 'react';
import { AiOutlineStar, AiOutlineHome } from 'react-icons/ai';
import { FiUsers } from 'react-icons/fi';
import { MdPlaylistPlay } from 'react-icons/md';

import { TabButton } from '@/components/ui/TabButton';
import { Link } from '@/utils/route/Link';
import { Paths } from '@/utils/route/paths';

type Props = {
  currentPathName: string;
  userName: string;
  isMe?: boolean;
  asMenu?: boolean;
} & FlexProps;

export const UserSidePanelTabs: FC<Props> = ({
  currentPathName,
  userName,
  isMe,
  asMenu,
  ...props
}) => {
  return (
    <Flex flexDirection="column" {...props} sx={{ gap: '2px' }}>
      {isMe && (
        <Link path={Paths.home}>
          <TabButton
            isActive={currentPathName === Paths.home}
            asMenuItem={asMenu}
          >
            <Icon as={AiOutlineHome} />
            ホーム
          </TabButton>
        </Link>
      )}
      <Link path={Paths.posts} params={{ userName }}>
        <TabButton
          isActive={currentPathName === Paths.posts}
          asMenuItem={asMenu}
        >
          <Icon as={MdPlaylistPlay} />
          投稿
        </TabButton>
      </Link>
      <Link path={Paths.favorites} params={{ userName }}>
        <TabButton
          isActive={currentPathName === Paths.favorites}
          asMenuItem={asMenu}
        >
          <Icon as={AiOutlineStar} />
          お気に入り
        </TabButton>
      </Link>
      <Link path={Paths.following} params={{ userName }}>
        <TabButton
          isActive={currentPathName === Paths.following}
          asMenuItem={asMenu}
        >
          <Icon as={FiUsers} />
          フォロー中
        </TabButton>
      </Link>
      <Link path={Paths.followers} params={{ userName }}>
        <TabButton
          isActive={currentPathName === Paths.followers}
          asMenuItem={asMenu}
        >
          <Icon as={FiUsers} />
          フォロワー
        </TabButton>
      </Link>
    </Flex>
  );
};
