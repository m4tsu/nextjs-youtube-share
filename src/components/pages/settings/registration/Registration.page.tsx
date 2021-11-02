import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from '@chakra-ui/form-control';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input';
import { Divider, Stack, Text } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';
import { useRouter } from 'next/router';
import { ChangeEvent, FC, FormEvent, useState } from 'react';

import { Button } from '@/components/ui/Button';
import { Loading } from '@/components/ui/Loading';
import { Panel } from '@/components/ui/Panel';
import { supabaseClient } from '@/lib/supabase/client';
import { useUser } from '@/repositories/users';
import { useAuth, useAuthDispatch } from '@/services/auth/AuthProvider';
import { userSchemaOnCreate } from '@/types/domains/user';
import { Paths } from '@/utils/route/paths';
import { useDebounce } from '@/utils/useDebounce';

export const RegistrationPage: FC = () => {
  const authUser = supabaseClient.auth.user();
  const { me, isLoading: isLoadingMe } = useAuth();
  const { createUserWithUserName } = useAuthDispatch();
  const router = useRouter();
  const [userName, setUserName] = useState<string>(
    authUser?.user_metadata?.user_name ?? ''
  );
  const debouncedUserName = useDebounce(userName, 500);
  const { data: user, error, isValidating } = useUser(debouncedUserName);
  const validation = userSchemaOnCreate.safeParse({
    userName: debouncedUserName,
  });
  const isLoading = validation.success && (isValidating || (!error && !user));
  const isValid =
    validation.success && !user && error?.status === 404 && !isValidating;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    await createUserWithUserName(debouncedUserName);
  };

  if (!authUser) {
    if (router.isReady) {
      router.replace(Paths.login);
    }
    return <></>;
  }
  if (isLoadingMe) return <Loading />;
  if (me && router.isReady) {
    router.replace(Paths.home);
    return <></>;
  }
  return (
    <Panel display="flex" gridGap="2" flexDirection="column">
      <Stack>
        <Text as="h3" fontWeight="bold" fontSize="xl">
          tubetterID の設定
        </Text>
        <Text fontSize="sm">
          tubetterID はtubetter上でユーザーを特定するためのIDです.
        </Text>
      </Stack>
      <Divider />
      <Stack as="form" onSubmit={handleSubmit}>
        <FormControl isInvalid={!isValid}>
          <FormLabel htmlFor="userName">tubetterID</FormLabel>
          <InputGroup>
            <Input
              id="userName"
              name="userName"
              placeholder="tubetterID1234"
              value={userName}
              onChange={handleChange}
              disabled={isLoading}
            />
            {isLoading && (
              <InputRightElement>
                <Spinner color="primary.600" />
              </InputRightElement>
            )}
          </InputGroup>

          {isValid && (
            <Text color="primary.600" fontWeight="bold" mt="2">
              このIDは利用可能です
            </Text>
          )}
          {!!user && (
            <FormErrorMessage>
              このIDのユーザーが既に存在します
            </FormErrorMessage>
          )}
          {!validation.success && (
            <FormErrorMessage
              flexDirection="column"
              gridGap="sm"
              alignItems="baseline"
            >
              {validation.error.errors.map((e) => (
                <p key={e.code}>{e.message}</p>
              ))}
            </FormErrorMessage>
          )}
        </FormControl>
        <FormControl>
          <Button
            type="submit"
            colorScheme="primary"
            disabled={isLoading || !isValid}
          >
            IDを設定する
          </Button>
        </FormControl>
      </Stack>
    </Panel>
  );
};
