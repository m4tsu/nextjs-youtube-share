import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
} from '@chakra-ui/react';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import qs from 'query-string';
import React from 'react';
import { ReactElement, ReactNode } from 'react';

import { Paths } from './paths';


// 参考 https://zenn.dev/panda_program/articles/typescript-nextjs-routing

export type PathKey = keyof typeof Paths;
export type Path = typeof Paths[PathKey];

type WithoutSlash<T> = T extends `/${infer U}` ? U : never;
type Resource<T> = T extends `${infer U}/${infer S}` ? U | Resource<S> : T;
type DynamicRoute<T> = T extends `[${infer U}]` ? U : never;
type Params<T> = DynamicRoute<Resource<WithoutSlash<T>>>;
export type ParamKeys<T> = Params<T>;
type PathParams<T> = {
  path: T;
  params?: { [K in ParamKeys<T>]: string | number };
};
export type Args<T> = ParamKeys<T> extends never
  ? PathParams<T>
  : Required<PathParams<T>>;
export const getPath = <T extends Path>({ path, params }: Args<T>) => {
  if (!params) {
    return path;
  }
  return path
    .split('/')
    .map((str) => {
      const match = str.match(/\[(.*?)\]/);
      if (match) {
        const key = match[0];
        const trimmed = key.substring(1, key.length - 1) as ParamKeys<
          typeof path
        >;
        return params[trimmed];
      }
      return str;
    })
    .join('/');
};

const TypedLink: <T extends Path>(
  props: Args<T> & {
    children?: ReactNode;
    className?: string;
    query?: { [key: string]: string | number | string[] };
    hash?: string;
    chakraLinkProps?: Omit<ChakraLinkProps, 'href'>;
  } & Omit<NextLinkProps, 'href'>
) => ReactElement = ({ ...props }) => {
  const path = getPath(props);
  const query = props.query ? `?${qs.stringify(props.query)}` : '';
  const hash = props.hash ? `#${props.hash}` : '';
  const href = path + query + hash;
  const { className, children, chakraLinkProps, ...linkProps } = props;
  return (
    <NextLink href={href} passHref {...linkProps} shallow={false}>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      {/* <a className={className}>{children}</a> */}
      <ChakraLink
        _hover={{ textDecoration: 'none' }}
        {...chakraLinkProps}
        onClick={() => (document.activeElement as HTMLElement).blur()}
      >
        {children}
      </ChakraLink>
    </NextLink>
  );
};

export { TypedLink as Link };
