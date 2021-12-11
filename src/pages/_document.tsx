import { ColorModeScript } from '@chakra-ui/react';
import NextDocument, { Head, Html, Main, NextScript } from 'next/document';

import { theme } from '@/lib/chakraUI/theme';

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="ja">
        <Head />
        <body style={{ marginRight: '0px !important' }}>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
