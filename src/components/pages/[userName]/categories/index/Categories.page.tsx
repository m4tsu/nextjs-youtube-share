import { FC } from 'react';

type Props = {
  userName?: string;
  categoryName?: string;
};
export const CategoryPage: FC<Props> = ({ userName, categoryName }) => {
  return <div>カテゴリー管理するページ</div>;
};
