import { ChakraProvider } from '@chakra-ui/react';
import * as Sentry from '@sentry/nextjs';
import { MyAppProps } from 'next/app';
import Head from 'next/head';
import { SWRConfig } from 'swr';

import { AppBar } from '@/components/layouts/AppBar/AppBar';
import { AuthGuard } from '@/components/layouts/AuthGuard/AuthGuard';
import { Footer } from '@/components/layouts/Footer/Footer';
import { Main } from '@/components/layouts/Main/Main';
import { ModalPage } from '@/components/layouts/ModalPage/ModalPage';
import { theme, toast } from '@/lib/chakraUI/theme';
import { AuthProvider } from '@/services/auth/AuthProvider';
import { HttpError } from '@/utils/types/error';

function MyApp({ Component, pageProps, router }: MyAppProps) {
  const getLayout = Component.getLayout || ((page) => <Main>{page}</Main>);
  const requireLogin = Component.requireLogin || false;
  const asModal = !!router.query.asModal;
  return (
    <ChakraProvider resetCSS theme={theme}>
      <SWRConfig
        value={{
          onError: (error, key) => {
            console.log('SWRConfig.onError', key, error.status);
            if (error instanceof HttpError) {
              if (error.requireAlert) {
                toast({
                  title: error.message,
                  description: error.details.map((detail, i) => (
                    <p key={i}>{detail}</p>
                  )),
                  status: 'error',
                  position: 'top-right',
                  duration: 3000,
                  isClosable: true,
                });
              }
              if (error.unexpected) {
                Sentry.captureException(error);
                console.log('Unexpected HttpError!!!', error);
              }
              return;
            }
            Sentry.captureException(error);
            console.log('Unexpected Error!!!', error);
          },
          shouldRetryOnError: false,
          revalidateOnFocus: true,
          // revalidateOnMount: true,
          revalidateOnReconnect: true,
          errorRetryCount: 2,
        }}
      >
        <AuthProvider>
          <AppBar />
          <Head>
            <title>Tubetter</title>
          </Head>
          <AuthGuard requireLogin={requireLogin}>
            {getLayout(<Component {...pageProps} />)}
          </AuthGuard>
          <Footer />
          {asModal && <ModalPage />}
        </AuthProvider>
      </SWRConfig>
    </ChakraProvider>
  );
}

export default MyApp;
