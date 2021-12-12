import { ColorModeScript } from '@chakra-ui/react';
import NextDocument, { Head, Html, Main, NextScript } from 'next/document';

import { theme } from '@/lib/chakraUI/theme';

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="ja">
        <Head>
          <meta
            name="description"
            content="Tubetter はお気に入りの動画をシェアするためのサービスです！"
          />
          <link rel="icon" sizes="32x32" href="/favicon-32.png" />
          <link rel="icon" sizes="16x16" href="/favicon-16.png" />
          <link
            href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@700&display=swap"
            rel="stylesheet"
          />
          <link rel="canonical" />
        </Head>
        <body style={{ marginRight: '0px !important' }}>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
