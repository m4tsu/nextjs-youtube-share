import { ReactNode } from 'react';

import type { NextPage } from 'next';

declare module 'next' {
  export declare type NextAppPage<P = Record<string, unknown>, IP = P> =
    NextPage<P, IP> & {
      getLayout?: (component: ReactNode) => ReactNode;
      requireLogin?: boolean;
    };
}
