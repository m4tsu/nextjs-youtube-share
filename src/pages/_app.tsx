import { ChakraProvider } from '@chakra-ui/react';
import { MyAppProps } from 'next/app';
import Head from 'next/head';
import { SWRConfig } from 'swr';

import { AppBar } from '@/components/layouts/AppBar/AppBar';
import { AuthGuard } from '@/components/layouts/AuthGuard/AuthGuard';
import { Main } from '@/components/layouts/Main/Main';
import { theme, toast } from '@/lib/chakraUI/theme';
import { AuthProvider } from '@/services/auth/AuthProvider';
import { HttpError } from '@/utils/types/error';

function MyApp({ Component, pageProps, router }: MyAppProps) {
  const getLayout = Component.getLayout || ((page) => <Main>{page}</Main>);
  const requireLogin = Component.requireLogin || false;
  return (
    <ChakraProvider theme={theme}>
      <SWRConfig
        value={{
          onError: (error, key) => {
            console.log('SWRConfig.onError', key, error.status);
            if (error instanceof HttpError) {
              if (error.requireAlert) {
                toast({
                  title: error.message,
                  description: error.details.map((detail, i) => (
                    <p key={i}>detail</p>
                  )),
                  status: 'error',
                  position: 'top-right',
                  duration: 4000,
                  isClosable: true,
                });
              }
              if (error.unexpected) {
                console.log('Unexpected HttpError!!!', error);
              }
              return;
            }
            console.log('Unexpected Error!!!', error);
          },
          shouldRetryOnError: false,
          revalidateOnFocus: false,
          // revalidateOnMount: true,
          revalidateOnReconnect: false,
        }}
      >
        <AuthProvider>
          <AppBar />
          <Head>
            <title>Tubetter</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          {/* {router.isReady && (<></>)} */}
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
