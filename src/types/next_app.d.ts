import type { NextAppPage } from 'next';
import type { AppProps } from 'next/app';

declare module 'next/app' {
  type MyAppProps<P = {}> = AppProps<P> & {
    Component: NextAppPage<P>;
  };
}
