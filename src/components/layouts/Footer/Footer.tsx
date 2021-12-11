import { useColorModeValue } from '@chakra-ui/color-mode';
import { Flex, Text } from '@chakra-ui/layout';
import React, { FC } from 'react';

import { Container } from '@/components/ui/Container';
import { Panel } from '@/components/ui/Panel';
import { Link } from '@/utils/route/Link';

export const Footer: FC = () => {
  const bgColor = useColorModeValue('white', 'darkPrimary.700');
  const borderColor = useColorModeValue('gray.200', 'darkPrimary.400');
  return (
    <Panel
      width="full"
      py={4}
      bgColor={bgColor}
      borderColor={borderColor}
      borderTopWidth="1px"
    >
      <Container>
        <Flex flexDirection="column" sx={{ gap: '0.5rem' }}>
          <Link path="/privacy">
            <Text variant="secondary" fontSize="xs">
              プライバシーポリシー
            </Text>
          </Link>
          <Link path="/terms">
            <Text variant="secondary" fontSize="xs">
              利用規約
            </Text>
          </Link>
        </Flex>
      </Container>
    </Panel>
  );
};
