import { useDisclosure } from '@chakra-ui/hooks';
import Icon from '@chakra-ui/icon';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Box, Divider, Flex, Text } from '@chakra-ui/layout';
import {
  Menu,
  MenuButton,
  MenuItem as CMenuItem,
  MenuItemProps,
  MenuList,
} from '@chakra-ui/menu';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal';
import { useRouter } from 'next/router';
import React, { FC, memo, useCallback } from 'react';
import { MdMoreVert } from 'react-icons/md';

import { CategoryLinkButton } from '@/components/domain/category/CategoryLinkButtion';
import { FavoriteButton } from '@/components/domain/post/FavoriteButton';
import { Error } from '@/components/pages/error/Error';
import { Button } from '@/components/ui/Button';
import { Loading } from '@/components/ui/Loading';
import { Panel } from '@/components/ui/Panel';
import { VideoPlayer } from '@/components/ui/VideoPlayer';
import { toast } from '@/lib/chakraUI/theme';
import { toDate } from '@/lib/dayjs/utils';
import { postsRepository, usePost } from '@/repositories/posts';
import { useAuth } from '@/services/auth/AuthProvider';
import { getEmbedUrl } from '@/utils/domains/post/video';
import { Paths } from '@/utils/route/paths';
import { HttpError } from '@/utils/types/error';

import { CommentCard } from './CommentCard';
import { CommentForm } from './CommentForm';
import { DeletePostModal } from './DeletePostModal';
import { EditPost } from './EditPost';

const MenuItem: FC<MenuItemProps> = (props) => (
  <CMenuItem display="flex" sx={{ gap: '0.5rem' }} {...props} />
);

type Props = {
  userName?: string;
  postId?: string;
};

const PostPageComponent: FC<Props> = ({ userName, postId }) => {
  const router = useRouter();
  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure();
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();

  const { data, error } = usePost(userName, postId);
  const { me } = useAuth();
  const isMine = me ? me.userName === userName : false;

  const onUnFavorite = useCallback(
    async (postId: string) => {
      if (!me) {
        router.push({ pathname: Paths.login });
        return;
      }
      try {
        await postsRepository.unFavorite(postId);
        toast({ title: 'お気に入りを解除しました.', status: 'success' });
      } catch (e) {
        if (e instanceof HttpError) {
          if (e.status === 404) {
            router.push(Paths.login);
            return;
          }
        } else {
          throw e;
        }
      }
    },
    [router, me]
  );

  const onFavorite = useCallback(
    async (postId: string) => {
      if (!me) {
        router.push({ pathname: Paths.login });
        return;
      }
      try {
        await postsRepository.favorite(postId);
        toast({ title: 'お気に入りしました.', status: 'success' });
      } catch (e) {
        if (e instanceof HttpError) {
          if (e.status === 404) {
            router.push(Paths.login);
            return;
          }
        } else {
          throw e;
        }
      }
    },
    [router, me]
  );

  if (error) return <Error error={error.serialize()} />;
  if (!userName || !data) return <Loading />;
  const { type, videoId, title, body, updatedAt, categories } = data;
  const embedUrl = getEmbedUrl(type, videoId);
  return (
    <>
      <Panel display="flex" flexDirection="column" gridGap="2" p={0}>
        <VideoPlayer embedUrl={embedUrl} />
        <Flex flexDirection="column" gridGap="2" px={4} pb={4}>
          <Text as="h1" fontWeight="bold" fontSize="3xl">
            {title}
          </Text>
          <Flex alignItems="center" gridGap="2" fontSize="md">
            <Text as="time" variant="secondary" flexShrink={0}>
              {toDate(updatedAt)}
            </Text>
            <Flex flex="1 1 auto" flexWrap="wrap" sx={{ gap: '.5rem' }}>
              {categories &&
                categories.map((category) => (
                  <CategoryLinkButton
                    key={category.id}
                    userName={userName}
                    categoryName={category.name}
                  >
                    {category.name}
                  </CategoryLinkButton>
                ))}
            </Flex>
            <Flex flexShrink={0} alignItems="center">
              {userName && (
                <FavoriteButton
                  postId={data.id}
                  userName={userName}
                  favorited={data.favorited || false}
                  favoritesCount={data.favoritesCount || 0}
                  w={8}
                  h={8}
                  onFavorite={onFavorite}
                  onUnFavorite={onUnFavorite}
                />
              )}
              {isMine && (
                <Flex>
                  <Menu>
                    <MenuButton
                      as={Button}
                      borderRadius="full"
                      p={0}
                      variant="outline"
                      borderWidth="0"
                      fontSize="2xl"
                    >
                      <Icon as={MdMoreVert} boxSize="32px" />
                    </MenuButton>
                    <MenuList>
                      <MenuItem onClick={onOpenEdit}>
                        <EditIcon />
                        編集
                      </MenuItem>
                      <MenuItem onClick={onOpenDelete}>
                        <DeleteIcon />
                        削除
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Flex>
              )}
            </Flex>
          </Flex>
          {body && (
            <>
              <Divider borderColor="gray.400" />
              <Box py={4}>
                <Text whiteSpace="pre-wrap" fontSize="md">
                  {body}
                </Text>
              </Box>
            </>
          )}

          <Divider borderColor="gray.400" />
          <Flex flexDirection="column" sx={{ gap: '2rem' }}>
            {data.comments?.length ? (
              <Text textAlign="center">{data.comments.length}件のコメント</Text>
            ) : (
              <></>
            )}
            <Flex flexDirection="column" sx={{ gap: '1rem' }}>
              {data.comments &&
                data.comments.map((comment) => (
                  <CommentCard
                    key={comment.id}
                    comment={comment}
                    userName={userName}
                    isMyPost={isMine}
                  />
                ))}
            </Flex>
            {postId && me && (
              <CommentForm me={me} postId={postId} userName={userName} />
            )}
          </Flex>
        </Flex>
      </Panel>
      {me && (
        <Modal isOpen={isOpenEdit} onClose={onCloseEdit} size="4xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>投稿を編集する</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <EditPost post={data} me={me} onUpdated={onCloseEdit} />
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
      {me && (
        <DeletePostModal
          isOpen={isOpenDelete}
          onClose={onCloseDelete}
          myUserName={me.userName}
          postId={data.id}
        />
      )}
    </>
  );
};

export const PostPage = memo(PostPageComponent);
