import type { NextPage } from 'next';
import { ReactNode } from 'react';

declare module 'next' {
  export declare type NextAppPage<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (component: ReactNode) => ReactNode;
    requireLogin?: boolean;
  };
}
