/* eslint-disable @typescript-eslint/no-empty-function */
import router from 'next/router';

import { ApiErrorObject, HttpError, NetworkError } from '@/utils/types/error';

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
    try {
      const res = await fetch(url, {
        method: 'GET',
        headers: new Headers({ 'Content-Type': 'application/json' }),
      });
      if (!res.ok) {
        const error = new HttpError(res, (await res.json()) as ApiErrorObject);
        throw error;
      }
      return res.json() as Promise<ResponsData>;
    } catch (e) {
      if (e instanceof HttpError) throw e;
      throw new NetworkError();
    }
  }

  async post<ResponsData, RequestParams = any>({
    url,
    params,
    config,
  }: FetchParams<RequestParams>) {
    try {
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
    } catch (e) {
      if (e instanceof HttpError) throw e;
      throw new NetworkError();
    }
  }

  async put<ResponsData, RequestParams extends Record<string, unknown>>({
    url,
    params,
    config,
  }: FetchParams<RequestParams>) {
    try {
      const res = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(params),
        headers: new Headers({ 'Content-Type': 'application/json' }),
        ...config,
      });
      if (!res.ok) {
        const error = new HttpError(res, (await res.json()) as ApiErrorObject);
        console.log('http put error', error);
        throw error;
      }
      return res.json() as Promise<ResponsData>;
    } catch (e) {
      if (e instanceof HttpError) throw e;
      throw new NetworkError();
    }
  }

  async patch<ResponsData, RequestParams extends Record<string, unknown>>({
    url,
    params,
    config,
  }: FetchParams<RequestParams>) {
    try {
      const res = await fetch(url, {
        method: 'PATCH',
        body: JSON.stringify(params),
        headers: new Headers({ 'Content-Type': 'application/json' }),
        ...config,
      });
      if (!res.ok) {
        const error = new HttpError(res, (await res.json()) as ApiErrorObject);
        console.log('http put error', error);
        throw error;
      }
      return res.json() as Promise<ResponsData>;
    } catch (e) {
      if (e instanceof HttpError) throw e;
      throw new NetworkError();
    }
  }

  async delete<ResponsData, RequestParams = any>({
    url,
    params,
    config,
  }: FetchParams<RequestParams>) {
    try {
      const res = await fetch(url, {
        method: 'DELETE',
        body: JSON.stringify(params),
        headers: new Headers({ 'Content-Type': 'application/json' }),
        ...config,
      });
      console.log(res);
      if (res.redirected) {
        router.push(res.url);
      }
      if (!res.ok) {
        const error = new HttpError(res, (await res.json()) as ApiErrorObject);
        console.log('http post error', error);
        throw error;
      }
      return res.json() as Promise<ResponsData>;
    } catch (e) {
      if (e instanceof HttpError) throw e;
      throw new NetworkError();
    }
  }
}

export const httpClient = HttpClient.getInstance();
