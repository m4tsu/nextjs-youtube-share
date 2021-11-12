import { ButtonProps } from '@chakra-ui/button';
import React, { FC } from 'react';

import { Button } from '@/components/ui/Button';
import { Link } from '@/utils/route/Link';

type Props = {
  categoryName: string;
  userName: string;
} & ButtonProps;
export const CategoryLinkButton: FC<Props> = ({
  categoryName,
  userName,
  ...props
}) => {
  return (
    <Link
      path="/[userName]"
      params={{ userName }}
      query={{ category: categoryName }}
      chakraLinkProps={{ position: 'relative' }}
    >
      <Button
        variant="solid"
        size="xs"
        fontSize="xs"
        fontWeight="normal"
        colorScheme="blue"
        borderRadius="sm"
        py="1"
        px="2"
        {...props}
      >
        {categoryName}
      </Button>
    </Link>
  );
};
