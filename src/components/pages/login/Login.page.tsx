import { ListItem, Text, UnorderedList } from '@chakra-ui/layout';
import { Flex } from '@chakra-ui/react';
import { FC } from 'react';
import { FaTwitter } from 'react-icons/fa';

import { Button } from '@/components/ui/Button';
import { Panel } from '@/components/ui/Panel';
import { useAuthDispatch } from '@/services/auth/AuthProvider';
import { Link } from '@/utils/route/Link';

export const LoginPage: FC = () => {
  const { signIn } = useAuthDispatch();
  return (
    <Panel
      display="flex"
      flexDirection="column"
      sx={{ gap: '1rem' }}
      alignItems="center"
    >
      <Button colorScheme="twitter" onClick={signIn} leftIcon={<FaTwitter />}>
        Twitterアカウントで 新規登録 or ログイン
      </Button>
      <Flex justifyContent="center">
        <Text variant="secondary" fontSize="sm">
          ※
          <Text variant="secondary" as="span" textDecoration="underline">
            <Link path="/terms">利用規約</Link>
          </Text>
          、
          <Text variant="secondary" as="span" textDecoration="underline">
            <Link path="/privacy">プライバシーポリシー</Link>
          </Text>
          に同意の上ご利用ください
        </Text>
      </Flex>
      <UnorderedList>
        ログインすると以下のようなことができるようになります
        <ListItem>
          他のユーザーをフォローして、投稿を追うことができます
        </ListItem>
        <ListItem>投稿にコメントすることができます</ListItem>
        <ListItem>投稿をお気に入りすることができます</ListItem>
      </UnorderedList>
    </Panel>
  );
};
