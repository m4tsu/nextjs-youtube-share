import { supabaseClient } from '@/lib/supabase/client';
import { User } from '@supabase/gotrue-js';
import { GetServerSideProps, NextAppPage, NextPage } from 'next';

const HomePage: NextAppPage<{ user?: User }> = ({ user }) => {
  return (
    <div>
      Timeline Page <div>{user?.email}</div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  /* check to see if a user is set */
  console.log('hogegegegege', ctx.req.cookies);
  const { user } = await supabaseClient.auth.api.getUserByCookie(ctx.req);
  /* if no user is set, redirect to the sign-in page */
  if (!user) {
    return { props: {}, redirect: { destination: '/sign-in' } };
  }

  /* if a user is set, pass it to the page via props */
  return { props: { user } };
};
export default HomePage;
