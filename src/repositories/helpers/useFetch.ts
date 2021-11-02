import useSWR, { Fetcher } from 'swr';
import useSWRInfinite from 'swr/infinite';

import { HttpError } from '@/utils/types/error';

import { httpClient } from './httpClient';

export const useFetch = <
  T extends Record<string, unknown>,
  E extends unknown = HttpError
>(
  key: string | null,
  fetcher?: Fetcher<T>
) => {
  console.log('useFetch', key);
  const { data, error, mutate } = useSWR<T, E>(
    key,
    fetcher ? fetcher : fetcher ?? httpClient.get,
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
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
  E extends unknown = HttpError
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

const getKeyForInfiniteFetch = <
  Data extends { id: string },
  DataList extends Data[]
>(
  pageIndex: number,
  previousPageDataList: DataList | null,
  limit: number,
  path: string
) => {
  // 最初のページ
  if (pageIndex === 0) return `${path}?limit=${limit}`;
  // 前にフェッチしたときにデータがなければ追加フェッチしない
  if (!previousPageDataList) return null;
  // 前にフェッチしたときにデータがlimitより小さければこれ以上ないはずなので追加フェッチしない
  if (previousPageDataList.length < limit) return null;
  return `${path}?limit=${limit}&cursor=${
    previousPageDataList.slice(-1)[0].id
  }`;
};

export const useInfiniteFetch = <
  Data extends { id: string },
  E extends unknown = HttpError
>(
  limit: number,
  path: string,
  fetcher?: Fetcher<Data[]>
) => {
  const { data, error, setSize, size, isValidating } = useSWRInfinite<
    Data[],
    E
  >(
    (i, list) => getKeyForInfiniteFetch(i, list, limit, path),
    fetcher ?? httpClient.get
  );
  const isLast = data ? data.slice(-1)[0].length < limit : false;
  const loadMore = () => {
    if (!isLast) {
      setSize(size + 1);
    }
  };
  return { data, error, size, isValidating, isLast, loadMore };
};
