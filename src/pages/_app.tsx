import { Auth } from '@supabase/ui';
import { theme } from '@/lib/chakraUI/theme';
import { ChakraProvider, useToast } from '@chakra-ui/react';
import { MyAppProps } from 'next/app';
import { AppBar } from '@/components/layouts/AppBar/AppBar';
import Head from 'next/head';
import { Main } from '@/components/layouts/Main/Main';
import { AuthProvider } from '@/services/auth/AuthProvider';
import { SWRConfig } from 'swr';
import { AuthGuard } from '@/components/layouts/AuthGuard/AuthGuard';

function MyApp({ Component, pageProps, router }: MyAppProps) {
  const getLayout = Component.getLayout || ((page) => <Main>{page}</Main>);
  const requireLogin = Component.requireLogin || false;
  return (
    <ChakraProvider theme={theme}>
      <SWRConfig
        value={{
          onError: (error, key) => {
            console.log('SWRConfig.onError', key, error.status);
          },
          shouldRetryOnError: false,
          revalidateOnFocus: false,
          revalidateOnReconnect: false,
        }}
      >
        <AuthProvider>
          <AppBar />
          <Head>
            <title>Tubetter</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          {requireLogin ? (
            <AuthGuard>{getLayout(<Component {...pageProps} />)}</AuthGuard>
          ) : (
            getLayout(<Component {...pageProps} />)
          )}
          {/* {getLayout(<Component {...pageProps} />)} */}
        </AuthProvider>
      </SWRConfig>
    </ChakraProvider>
  );
}

export default MyApp;
