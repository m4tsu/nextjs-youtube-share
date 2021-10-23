import { extendTheme, createStandaloneToast } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';
import { mode } from '@chakra-ui/theme-tools';

// color は 500 がメインになる
const colors = {
  white: '#FFFFFF',
  bgWhite: '#F4F5F7',
  // gray: '#ccc',
  darkGray: '#6f7372',
  textMain: '#1A202C', //gray.800
  textSub: '#718096', //gray.500
  lightGray: '#a8abb1',
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
  primary: {
    200: '#00FFF2',
    300: '#00e5da',
    400: '#00ccc1',
    500: '#00b5ad',
    600: '#009991',
    700: '#007f79',
  },
  // bgPrimary: {
  //   500: '#2B4E4E',
  //   600: '#223E3E',
  //   700: '#192E2E',
  //   800: '#111f1f', #121212 とPromaryの8%を混ぜた色。Googleのダークモードガイドライン？にあるっぽい
  //   900: '#070d0d',
  // },
  primaryDark: {
    400: '#0B6379',
    500: '#095061',
    600: '#063D4A',
    // 700: '#052D37',
    700: '#0E2125',
    // 800: '#02161B',
    800: '#071012',
    900: '#000304',
  },
} as const;

export const breakpoints = createBreakpoints({
  sm: '560px',
  md: '770px',
  lg: '960px',
  xl: '1200px',
});

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
} as const;

export const theme = extendTheme({
  colors,
  breakpoints,
  config,
  styles: {
    global: (props) => ({
      body: {
        bg: mode('bgWhite', 'primaryDark.800')(props),
        color: mode('textMain', 'bgWhite')(props),
      },
      '#chakra-toast-manager-top-right': {
        // TODO: 正式な指定方法わからない
        top: '70px!important',
      },
    }),
  },
  components: {
    // AppBar: {
    //   baseStyle: (props) => ({
    //     bg: mode('primary.500', 'primaryDark.700')(props),
    //   }),
    // },
    Text: {
      baseStyle: {
        wordBreak: 'break-word',
      },
    },
    Toast: {
      baseStyle: {
        width: '100%',
      },
    },
  },
});

export const toast = createStandaloneToast({
  theme,
  defaultOptions: {
    duration: 4000,
    isClosable: true,
    position: 'top-right',
    variant: 'solid',
  },
});
