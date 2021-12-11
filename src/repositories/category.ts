import { mutate } from 'swr';

import { Category } from '@/types/domains/category';
import { User } from '@/types/domains/user';
import { ApiPaths, getApiPath, getFetchKey } from '@/utils/route/apiPaths';

import { httpClient } from './helpers/httpClient';
import { useFetch } from './helpers/useFetch';

class CategoryRepository {
  private static instance: CategoryRepository;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}
  static getInstance() {
    if (!CategoryRepository.instance) {
      CategoryRepository.instance = new CategoryRepository();
    }
    return CategoryRepository.instance;
  }

  deleteCategory = async (
    categoryId: Category['id'],
    userName: User['userName']
  ) => {
    await httpClient.delete({
      url: getApiPath({
        path: '/api/categories/[categoryId]',
        params: { categoryId },
      }),
    });
    mutate<Category[]>(
      getFetchKey({
        path: '/api/users/[userName]/categories',
        params: { userName },
      }),
      (data) => {
        if (!data) return undefined;
        return data.filter((category) => category.id !== categoryId);
      },
      false
    );
  };
}

export const categoryRepository = CategoryRepository.getInstance();

export const useCategories = (userName?: string) => {
  return useFetch<Category[]>(
    getFetchKey({
      path: ApiPaths.userCategories,
      params: { userName },
    })
  );
};
