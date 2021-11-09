import useSWR, { Fetcher } from 'swr';

import { HttpError } from '@/utils/types/error';

import { httpClient } from './httpClient';

const getKeyForPaginationFetch = (
  pageIndex: number,
  perPage: number,
  path: string
) => {
  return `${path}?pageIndex=${pageIndex}&perPage=${perPage}`;
};

export const usePaginationFetch = <Data, E extends unknown = HttpError>(
  path: string | null,
  pageIndex: number,
  perPage: number,
  fetcher?: Fetcher<Data>
) => {
  const { data, error } = useSWR<Data, E>(
    path ? getKeyForPaginationFetch(pageIndex, perPage, path) : null,
    fetcher ?? httpClient.get
  );

  return { data, error };
};
