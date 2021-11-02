import { NextAppPage } from 'next';

import { Button } from '@/components/ui/Button';
import { supabaseClient } from '@/lib/supabase/client';
import { httpClient } from '@/repositories/helpers/httpClient';
import { User } from '@/types/domains/user';
import { ApiPaths } from '@/utils/route/apiPaths';

const createUser = async () => {
  const res = await httpClient.post<User>({ url: ApiPaths.createUser });
  console.log(res);
  return res;
};

const getMe = async () => {
  const res = await httpClient.get<User>(ApiPaths.me);
  console.log(res);
  return res;
};

const refreshSession = async () => {
  const res = await supabaseClient.auth.refreshSession();
  console.log('reflesh', res);
};

const HomePage: NextAppPage = () => {
  return (
    <div>
      <h1>Timeline Page</h1>
      <div>
        <button onClick={createUser}>createUser test</button>
      </div>
      <div>
        <Button onClick={getMe} colorScheme="primary">
          Get Me
        </Button>
        <Button onClick={refreshSession} colorScheme="primary">
          refresh session
        </Button>
      </div>
    </div>
  );
};

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   /* check to see if a user is set */
//   console.log('hogegegegege', ctx.req.cookies);
//   const { user } = await supabaseClient.auth.api.getUserByCookie(ctx.req);
//   /* if no user is set, redirect to the sign-in page */
//   if (!user) {
//     return { props: {}, redirect: { destination: '/sign-in' } };
//   }

//   /* if a user is set, pass it to the page via props */
//   return { props: { user } };
// };
export default HomePage;
