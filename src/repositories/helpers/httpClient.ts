/* eslint-disable @typescript-eslint/no-empty-function */
import router from 'next/router';

import { ApiErrorObject, HttpError } from '@/utils/types/error';

type FetchParams<RequestParams> = {
  url: string;
  config?: Omit<RequestInit, 'body' | 'method'>;
} & (RequestParams extends Record<string, unknown>
  ? { params: RequestParams }
  : { params?: unknown });

class HttpClient {
  private static instance: HttpClient;
  private constructor() {}
  static getInstance() {
    if (!HttpClient.instance) {
      HttpClient.instance = new HttpClient();
    }
    return HttpClient.instance;
  }

  async get<ResponsData>(url: string) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const res = await fetch(url, {
      method: 'GET',
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });
    if (!res.ok) {
      const error = new HttpError(res, (await res.json()) as ApiErrorObject);
      console.log('http get error', error.serialize());
      throw error;
    }
    console.log(res);
    return res.json() as Promise<ResponsData>;
  }

  async post<ResponsData, RequestParams = any>({
    url,
    params,
    config,
  }: FetchParams<RequestParams>) {
    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(params),
      headers: new Headers({ 'Content-Type': 'application/json' }),
      ...config,
    });
    if (res.redirected) {
      router.push(res.url);
    }
    if (!res.ok) {
      const error = new HttpError(res, (await res.json()) as ApiErrorObject);
      console.log('http post error', error);
      throw error;
    }
    return res.json() as Promise<ResponsData>;
  }

  async put<ResponsData, RequestParams extends Record<string, unknown>>({
    url,
    params,
    config,
  }: FetchParams<RequestParams>) {
    const res = await fetch(url, {
      method: 'PUT',
      body: JSON.stringify(params),
      ...config,
    });
    if (!res.ok) {
      const error = new HttpError(res, (await res.json()) as ApiErrorObject);
      console.log('http put error', error);
      throw error;
    }
    return res.json() as Promise<ResponsData>;
  }
}

export const httpClient = HttpClient.getInstance();
