import { HttpError, SupabaseError } from '@/utils/types/error';
import { useToast } from '@chakra-ui/toast';
import useSWR, { Fetcher } from 'swr';

type FetchParams<RequestParams extends {}> = {
  url: string;
  params: RequestParams;
  config?: Omit<RequestInit, 'body' | 'method'>;
};

export const api = {
  get: async <ResponsData extends {}>(url: string) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const res = await fetch(url);
    if (!res.ok) {
      const error = new HttpError(res, (await res.json()).error);
      console.log('http get error', error.serialize());
      throw error;
    }
    return res.json() as Promise<ResponsData>;
  },
  post: async <ResponsData extends {}, RequestParams extends {}>({
    url,
    params,
    config,
  }: FetchParams<RequestParams>) => {
    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(params),
      ...config,
    });
    if (!res.ok) {
      const error = new HttpError(res, (await res.json()).error);
      console.log('http post error', error);
      throw error;
    }
    return res.json() as Promise<ResponsData>;
  },
  put: async <ResponsData extends {}, RequestParams extends {}>({
    url,
    params,
    config,
  }: FetchParams<RequestParams>) => {
    const res = await fetch(url, {
      method: 'PUT',
      body: JSON.stringify(params),
      ...config,
    });
    if (!res.ok) {
      const error = new HttpError(res, (await res.json()).error);
      console.log('http put error', error);
      throw error;
    }
    return res.json() as Promise<ResponsData>;
  },
};

export const useFetch = <T extends {}, E extends unknown = HttpError>(
  key: string | null,
  fetcher?: Fetcher<T>
) => {
  console.log('useFetch', key);
  const toast = useToast();
  const { data, error, mutate } = useSWR<T, E>(
    key,
    fetcher ? fetcher : api.get,
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  if (error) {
    if (error instanceof HttpError) {
      toast({
        title: 'HttpError',
        description: error.message,
        status: 'error',
        position: 'top-right',
        duration: 4000,
        isClosable: true,
      });
    }
    if (error instanceof SupabaseError) {
      toast({
        title: 'SupabaseError',
        description: error.message,
        status: 'error',
        position: 'top-right',
        duration: 4000,
        isClosable: true,
      });
    }
  }
  return {
    data,
    error,
    mutate,
  };
};
