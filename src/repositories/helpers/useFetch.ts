import useSWR, { Fetcher, SWRConfiguration } from 'swr';

import { HttpError, NetworkError } from '@/utils/types/error';

import { httpClient } from './httpClient';

export const useFetch = <T, E extends unknown = HttpError | NetworkError>(
  key: string | null,
  // fetcher?: Fetcher<T>
  config?: SWRConfiguration
) => {
  console.log('useFetch', key);
  const { data, error, mutate } = useSWR<T, E>(key, httpClient.get, config);
  console.log(error);
  return {
    data,
    error,
    mutate,
  };
};

// isValidatingを使わなくても、useSWRから取得してしまうとisValidatingに応じてレンダリングが起こってしまうので使うかどうかで呼び出しを変える
export const useFetchWithValidating = <
  T extends Record<string, unknown>,
  E extends unknown = HttpError | NetworkError
>(
  key: string | null,
  fetcher?: Fetcher<T>
) => {
  console.log('useFetch', key);
  const { data, error, mutate, isValidating } = useSWR<T, E>(
    key,
    fetcher ?? httpClient.get,
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  return {
    data,
    error,
    mutate,
    isValidating,
  };
};
