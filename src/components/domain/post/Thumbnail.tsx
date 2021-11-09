import Image from 'next/image';
import { FC, memo } from 'react';

type Props = {
  src: string;
};
const Component: FC<Props> = ({ src }) => {
  return <Image src={src} />;
};
export const Thumbnail = memo(Component);
