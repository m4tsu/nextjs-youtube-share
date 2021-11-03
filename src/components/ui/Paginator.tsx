import {
  ButtonGroup,
  ButtonProps as ChakraButtonProps,
} from '@chakra-ui/button';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Flex } from '@chakra-ui/layout';
import { FC } from 'react';

import { Button } from './Button';

type PaginatorButton = ChakraButtonProps & { hidden?: boolean };
const PaginatorButton: FC<PaginatorButton> = ({
  children,
  hidden,
  ...props
}) => (
  <Button
    variant="link"
    borderRadius="none"
    fontWeight="bold"
    p={2}
    opacity={hidden ? 0 : 1}
    color="gray.600"
    borderColor="gray.300"
    borderWidth="1px"
    {...props}
  >
    {children}
  </Button>
);

type Props = {
  totalPage: number;
  currentPage: number;
  onPageChange?: (page: number) => void;
};
export const Paginator: FC<Props> = ({
  totalPage,
  currentPage,
  onPageChange,
}) => {
  const prevPage = currentPage > 1 ? currentPage - 1 : null;
  const nextPage = currentPage < totalPage ? currentPage + 1 : null;

  const handleChangePage = (page: number) => () => {
    if (onPageChange) {
      onPageChange(page);
    }
  };

  return (
    <Flex width="full" justifyContent="center">
      <ButtonGroup variant="outline" spacing={0} borderRadius="none">
        {prevPage && (
          <>
            <PaginatorButton onClick={handleChangePage(prevPage)}>
              <ChevronLeftIcon />
            </PaginatorButton>
            {prevPage > 1 && (
              <PaginatorButton onClick={handleChangePage(1)}>1</PaginatorButton>
            )}

            {prevPage > 2 && <PaginatorButton>...</PaginatorButton>}

            <PaginatorButton onClick={handleChangePage(prevPage)}>
              {prevPage}
            </PaginatorButton>
          </>
        )}

        <PaginatorButton
          backgroundColor="gray.200"
          disabled
          _disabled={{ opacity: 1, background: 'gray.200' }}
          _hover={{ opacity: 1, background: 'gray.200' }}
        >
          {currentPage}
        </PaginatorButton>

        {nextPage && (
          <>
            <PaginatorButton onClick={handleChangePage(nextPage)}>
              {nextPage}
            </PaginatorButton>
            {nextPage < totalPage - 1 && <PaginatorButton>...</PaginatorButton>}
            {nextPage < totalPage && (
              <PaginatorButton onClick={handleChangePage(totalPage)}>
                {totalPage}
              </PaginatorButton>
            )}

            <PaginatorButton onClick={handleChangePage(nextPage)}>
              <ChevronRightIcon />
            </PaginatorButton>
          </>
        )}
      </ButtonGroup>
    </Flex>
  );
};
