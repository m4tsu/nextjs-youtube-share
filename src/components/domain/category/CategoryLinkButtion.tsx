import { ButtonProps } from '@chakra-ui/button';
import React, { FC } from 'react';

import { Button } from '@/components/ui/Button';
import { Link } from '@/utils/route/Link';
import { Paths } from '@/utils/route/paths';

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
      path={Paths.posts}
      params={{ userName }}
      query={{ category: categoryName }}
      chakraLinkProps={{ position: 'relative' }}
    >
      <Button
        variant="solid"
        size="xs"
        fontSize="xs"
        fontWeight="normal"
        bg="darkPrimary.50"
        color="gray.200"
        borderRadius="sm"
        py="0.5"
        px="2"
        _hover={{ bg: 'darkPrimary.300' }}
        {...props}
      >
        {categoryName}
      </Button>
    </Link>
  );
};
