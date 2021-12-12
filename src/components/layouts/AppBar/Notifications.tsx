import Icon from '@chakra-ui/icon';
import { Box, Divider, Text } from '@chakra-ui/layout';
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/menu';
import {
  Avatar,
  Flex,
  Portal,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';
import React, {
  FC,
  memo,
  UIEventHandler,
  useCallback,
  useEffect,
  useMemo,
} from 'react';
import { MdNotificationsNone } from 'react-icons/md';
import { mutate } from 'swr';

import { Error } from '@/components/pages/error/Error';
import { Loading } from '@/components/ui/Loading';
import { fromNow } from '@/lib/dayjs/utils';
import {
  notificationsRepository,
  useNotifications,
  useUnreadNotificationsCount,
} from '@/repositories/notification';
import { Notification } from '@/types/domains/notification';
import { User } from '@/types/domains/user';
import { assertUnexpectedValue } from '@/utils/assertUnexpectedValue';
import { debounce } from '@/utils/debounce';
import { Link } from '@/utils/route/Link';
import { getFetchKey } from '@/utils/route/apiPaths';

type NotificationPanelProps = {
  notification: Notification;
};
const NotificationPanel: FC<NotificationPanelProps> = memo(
  ({ notification }) => {
    const bgColor = useColorModeValue('white', 'darkPrimary.600');
    const hoverBgColor = useColorModeValue('bgWhite', 'darkPrimary.500');

    const Message = useMemo(() => {
      switch (notification.type) {
        case 'followed': {
          return (
            <>
              <Link
                path="/users/[userName]"
                params={{ userName: notification.notifier.userName }}
                chakraLinkProps={{ _hover: { textDecoration: 'underline' } }}
              >
                {notification.notifier.displayName}
              </Link>{' '}
              さんがあなたをフォローしました。
            </>
          );
        }
        case 'favorited': {
          return (
            <>
              <Link
                path="/users/[userName]"
                params={{ userName: notification.notifier.userName }}
                chakraLinkProps={{
                  _hover: { textDecoration: 'underline' },
                }}
              >
                {notification.notifier.displayName}
              </Link>{' '}
              さんが{' '}
              <Link
                path="/users/[userName]/posts/[postId]"
                params={{
                  userName: notification.notifier.userName,
                  postId: notification.targetId,
                }}
                chakraLinkProps={{
                  _hover: { textDecoration: 'underline' },
                }}
              >
                {notification.targetName}
              </Link>{' '}
              をお気に入りしました。
            </>
          );
        }
        case 'commented': {
          return (
            <>
              <Link
                path="/users/[userName]"
                params={{ userName: notification.notifier.userName }}
                chakraLinkProps={{
                  _hover: { textDecoration: 'underline' },
                }}
              >
                {notification.notifier.displayName}
              </Link>{' '}
              さんが{' '}
              <Link
                path="/users/[userName]/posts/[postId]"
                params={{
                  userName: notification.notifier.userName,
                  postId: notification.targetId,
                }}
                chakraLinkProps={{
                  _hover: { textDecoration: 'underline' },
                }}
              >
                {notification.targetName}
              </Link>{' '}
              にコメントしました。
            </>
          );
        }
        default: {
          return assertUnexpectedValue(notification.type);
        }
      }
    }, []);
    return (
      <Flex
        alignItems="flex-start"
        py={2}
        px={4}
        bgColor={bgColor}
        _hover={{
          bgColor: hoverBgColor,
        }}
        sx={{ gap: '1rem' }}
      >
        <Flex sx={{ gap: '6px' }}>
          <Flex
            width="4px"
            height="44px"
            justifyContent="center"
            alignItems="center"
          >
            {!notification.read && (
              <Box borderRadius="full" background="primary.500" boxSize="4px" />
            )}
          </Flex>
          <Link
            path="/users/[userName]"
            params={{ userName: notification.notifier.userName }}
          >
            <Avatar src={notification.notifier.avatarUrl} boxSize="44px" />
          </Link>
        </Flex>
        <Flex flexDirection="column">
          <Text
            variant="secondary"
            overflowY="hidden"
            fontSize="14px"
            lineHeight="1.5"
            maxHeight="63px"
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {Message}
          </Text>
          <Text as="time" variant="secondary" fontSize="sm">
            {fromNow(notification.createdAt)}
          </Text>
        </Flex>
      </Flex>
    );
  },
  (prev, next) => {
    return prev.notification.read === next.notification.read;
  }
);

const LIMIT = 12;
const MAX_COUNTS = 120;
const RERESH_INTERVAL = 1000 * 60 * 5;

const NotificationList: FC = () => {
  const scrollbarColor = useColorModeValue('gray.300', 'darkPrimary.400');
  const { data, error, isLast, isValidating, loadMore } = useNotifications(
    LIMIT,
    { refreshInterval: RERESH_INTERVAL }
  );
  const fetchLimited = data ? data.length >= MAX_COUNTS / LIMIT : false;

  useEffect(() => {
    notificationsRepository.readNotifications();

    return () => {
      mutate<number>(
        getFetchKey({ path: '/api/notifications/unreadCount' }),
        0,
        false
      );
    };
  }, []);

  const handleScroll: UIEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      e.stopPropagation();
      if (isLast || isValidating || fetchLimited) return;
      const element = e.target;
      const { scrollHeight, scrollTop, clientHeight } = element as any;
      if (scrollHeight - scrollTop - 50 < clientHeight) {
        loadMore();
      }
    },
    [isLast, isValidating, fetchLimited, loadMore]
  );

  const debounced = useMemo(() => debounce(handleScroll, 100), [handleScroll]);

  if (error) {
    return <Error error={error.serialize()} />;
  }

  return (
    <Box
      maxHeight="500px"
      width="100%"
      overflowY="scroll"
      onScroll={debounced}
      sx={{
        '&::-webkit-scrollbar': {
          width: '8px',
        },
        '&::-webkit-scrollbar-track': {
          width: '8px',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: scrollbarColor,
        },
      }}
    >
      {data ? (
        <>
          {data.flat().map((notification) => (
            <NotificationPanel
              key={notification.id}
              notification={notification}
            />
          ))}
          {isValidating && <Loading />}
        </>
      ) : (
        <Loading />
      )}
    </Box>
  );
};

type Props = {
  me: User;
};
const COUNT_REFRESH_INTERVAL = 1000 * 60 * 5;
export const Notifications: FC<Props> = ({ me }) => {
  const width = useBreakpointValue({ base: '100vw', sm: '480px' });
  const hoverBg = useColorModeValue('gray.50', 'darkPrimary.500');
  const { data, error } = useUnreadNotificationsCount({
    refreshInterval: COUNT_REFRESH_INTERVAL,
  });

  const count = error ? 0 : data ? data : 0;
  return (
    <Menu strategy="fixed" isLazy autoSelect={false}>
      <MenuButton
        px={3}
        _hover={{ bgColor: hoverBg }}
        _active={{ backgroundColor: 'unset' }}
      >
        <Box position="relative">
          {count > 0 && (
            <Flex
              position="absolute"
              top="-4px"
              right="12px"
              boxSize="20px"
              borderRadius="full"
              bgColor="red.600"
              color="whiteAlpha.800"
              justifyContent="center"
              alignItems="center"
            >
              {count}
            </Flex>
          )}
          <Icon as={MdNotificationsNone} boxSize="30px" />
        </Box>
      </MenuButton>
      <Portal>
        <MenuList
          zIndex="popover"
          display="flex"
          flexDirection="column"
          width={width}
          p={0}
        >
          <Text variant="secondary" fontSize="lg" p={4}>
            通知
          </Text>
          <Divider />
          <MenuItem
            _active={{ background: 'unset' }}
            _focus={{ background: 'unset' }}
            px={0}
            py={2}
            as="div"
            cursor="default"
          >
            <NotificationList />
          </MenuItem>
        </MenuList>
      </Portal>
    </Menu>
  );
};
