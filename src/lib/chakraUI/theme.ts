import { createStandaloneToast, extendTheme } from '@chakra-ui/react';
// import { createStandaloneToast, extendTheme, theme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';
import { mode } from '@chakra-ui/theme-tools';

// https://colorhunt.co/palette/283149404b6900818adbedf3 この組み合わせよさそう

// color は 500 がメインになる
export const colors = {
  bgWhite: '#F4F5F7',
  darkGray: '#6f7372',
  textMain: '#1A202C', //gray.800
  textSub: '#718096', //gray.500
  lightGray: '#a8abb1',
  // primary: {
  //   200: '#00FFF2',
  //   300: '#00e5da',
  //   400: '#00ccc1',
  //   500: '#00b5ad',
  //   600: '#009991',
  //   700: '#007f79',
  // },
  // bgPrimary: {
  //   500: '#2B4E4E',
  //   600: '#223E3E',
  //   700: '#192E2E',
  //   800: '#111f1f', #121212 とPromaryの8%を混ぜた色.Googleのダークモードガイドライン？にあるっぽい
  //   900: '#070d0d',
  // },
  // primaryDark: {
  //   400: '#0B6379',
  //   500: '#095061',
  //   600: '#063D4A',
  //   // 700: '#052D37',
  //   700: '#0E2125',
  //   // 800: '#02161B',
  //   800: '#071012',
  //   900: '#000304',
  // },
  // white: '#DBEDF3',

  // primary: {
  //   50: '#3DF5FF',
  //   100: '#23F4FF',
  //   200: '#0AF2FF',
  //   300: '#00E3EF',
  //   400: '#00CBD6',
  //   500: '#00B3BC',
  //   600: '#009BA3',
  //   700: '#00818A',
  //   800: '#006A70',
  //   900: '#005256',
  // },
  primary: {
    50: '#A3FAFF',
    100: '#89F9FF',
    200: '#56F6FF',
    300: '#23F4FF',
    400: '#00E3EF',
    500: '#00B3BC',
    600: '#00818A',
    700: '#006A70',
    800: '#005256',
    900: '#003A3D',
  },
  darkPrimary: {
    50: '#55689A',
    100: '#4C5D8A',
    200: '#425279',
    300: '#394769',
    400: '#303C58',
    500: '#283149',
    600: '#1E2537',
    700: '#151A27',
    800: '#0C0F17',
    900: '#030406',
  },
} as const;

export const breakpoints = createBreakpoints({
  sm: '560px',
  md: '770px',
  lg: '960px',
  xl: '1200px',
  '2xl': '1400px',
});

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
  cssVarPrefix: 'tbt',
} as const;

export const theme = extendTheme(
  {
    colors,
    breakpoints,
    config,
    styles: {
      global: (props) => ({
        html: {
          overflowY: 'scroll',
        },
        body: {
          bg: mode('bgWhite', 'darkPrimary.700')(props),
          color: mode('gray.800', 'bgWhite')(props),
          minHeight: '100vh',
        },
        main: {
          pb: '40px',
        },
        '#chakra-toast-manager-top-right': {
          // TODO: 正式な指定方法わからない
          top: '70px!important',
        },
      }),
    },
    components: {
      Text: {
        baseStyle: {
          wordBreak: 'break-word',
          margin: 0,
        },
        colors,
        variants: {
          pageTitle: (props) => ({
            fontSize: '2xl',
            fontWeight: 'bold',
            color: mode('gray.800', 'white')(props),
          }),
          primary: (props) => ({
            color: mode('gray.800', 'white')(props),
          }),
          secondary: (props) => ({
            color: mode('gray.600', 'gray.400')(props),
          }),
        },
        defaultProps: {
          variant: 'primary',
        },
      },
      Select: {
        parts: ['field'],
        baseStyle: (props) => ({
          field: {
            bg: mode('white', 'darkPrimary.600')(props),
            '> option, > optgroup': {
              bg: mode('white', 'darkPrimary.600')(props),
            },
          },
        }),
        colors,
      },
      Menu: {
        parts: ['list'],
        baseStyle: (props) => ({
          list: {
            padding: 4,
            bg: mode('white', 'darkPrimary.600')(props),
          },
        }),
      },
      Modal: {
        parts: ['dialog'],
        baseStyle: (props) => ({
          dialog: {
            padding: 4,
            bg: mode('white', 'darkPrimary.700')(props),
          },
        }),
      },
      Input: {
        parts: ['field'],
        baseStyle: (props) => ({
          field: {
            background: 'unset',
            backgroundColor: mode('white', 'darkPrimary.600')(props),
          },
        }),
        colors,
      },
      Textarea: {
        baseStyle: (props) => ({
          background: 'unset',
          backgroundColor: mode('white', 'darkPrimary.600')(props),
        }),
        colors,
      },
      Toast: {
        baseStyle: {
          width: '100%',
        },
      },
      Card: {
        baseStyle: (props) => ({
          borderRadius: 'md',
          boxShadow: 'xs',
          bg: mode('white', 'darkPrimary.600')(props),
          transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
          _hover: { boxShadow: mode('md', 'dark-lg')(props) },
        }),
        colors,
      },

      Panel: {
        baseStyle: (props) => ({
          p: 4,
          bg: mode('white', 'darkPrimary.700')(props),
        }),
        colors,
        variants: {
          default: {},
          rounded: {
            borderRadius: 'md',
          },
        },
        defaultProps: {
          variant: 'default',
        },
      },
    },
  }
  // withDefaultColorScheme({ colorScheme: 'primary' })
);

export const toast = createStandaloneToast({
  theme,
  defaultOptions: {
    duration: 3000,
    isClosable: true,
    position: 'top-right',
    variant: 'solid',
  },
});
