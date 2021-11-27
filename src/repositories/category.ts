import { Category } from '@/types/domains/category';
import { ApiPaths, getFetchKey } from '@/utils/route/apiPaths';

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
