import { New } from '@/components/pages/users/posts/New';
import { NextAppPage } from 'next';

const NewPostPage: NextAppPage = () => {
  return <New />;
};

NewPostPage.requireLogin = true;

export default NewPostPage;
