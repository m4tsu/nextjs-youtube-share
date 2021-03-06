/* eslint-disable @typescript-eslint/no-empty-function */
import { AuthChangeEvent, Session } from '@supabase/supabase-js';
import { useRouter } from 'next/router';
import {
  FC,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import { supabaseClient } from '@/lib/supabase/client';
import { usersRepository } from '@/repositories/users';
import { User } from '@/types/domains/user';
import { Paths } from '@/utils/route/paths';
import { HttpError } from '@/utils/types/error';

type AuthContextValue = {
  me: User | null;
  isLoading: boolean;
};
const AuthContext = createContext<AuthContextValue>({
  me: null,
  isLoading: false,
});

type AuthDispatchContextValue = {
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  createUserWithUserName: (userName: string) => Promise<void>;
};

const AuthDispatchContext = createContext<AuthDispatchContextValue>({
  signIn: async () => {},
  signOut: async () => {},
  createUserWithUserName: async () => {},
});

const signinWithTwitter = async () => {
  await supabaseClient.auth.signIn({ provider: 'twitter' });
};

export const AuthProvider: FC = ({ children }) => {
  const initialSession = supabaseClient.auth.session();
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(initialSession);
  const [me, setMe] = useState<User | null>(null);
  const [isLoadingMe, setIsLoadingMe] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [error, setError] = useState<any>(null);
  const isLoading = isLoadingMe || (!error && !me && !!session);

  const authenticated = useRef(false);
  console.log('AuthProvider', session, me, isLoading, error);

  const createUserWithUserName = useCallback(async (userName: string) => {
    const newUser = await usersRepository.createUserWithUserName(userName);
    setMe(newUser);
  }, []);

  const signOut = useCallback(async () => {
    router.push(Paths.top);
    setMe(null);
    await supabaseClient.auth.signOut();
  }, [router]);

  const authenticate = async (event: AuthChangeEvent, s: Session | null) => {
    // for server side auth
    try {
      setIsLoadingMe(true);
      await fetch('/api/auth', {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        credentials: 'same-origin',
        body: JSON.stringify({ event, session: s }),
      });
      if (event !== 'SIGNED_OUT') {
        const res = await usersRepository.fetchMe();
        setMe(res);

        authenticated.current = true;
      }
      setIsLoadingMe(false);
    } catch (e) {
      console.log(e instanceof HttpError, e);
      setError(e);
      if (e instanceof HttpError && e.status === 404) {
        setIsLoadingMe(false); // TODO: ???????????????????????????????????????????????????????????????????????????????????????...
        try {
          const r = await usersRepository.createUser();
          setMe(r);
        } catch (e) {
          if (e instanceof HttpError && e.status === 307) {
            router.push(Paths.registration);
          } else {
            throw e;
          }
        }
      } else {
        setMe(null);
      }
    }
    setIsLoadingMe(false);
  };

  useEffect(() => {
    const { data: authListener } = supabaseClient.auth.onAuthStateChange(
      async (event, s) => {
        setSession(s);
        await authenticate(event, s);
      }
    );
    if (session && !authenticated.current) {
      authenticate('SIGNED_IN', session);
    }

    return () => {
      if (authListener) {
        authListener.unsubscribe();
      }
    };
  }, []);

  return (
    <AuthContext.Provider value={{ isLoading: isLoading, me: me ?? null }}>
      <AuthDispatchContext.Provider
        value={{ createUserWithUserName, signIn: signinWithTwitter, signOut }}
      >
        {children}
      </AuthDispatchContext.Provider>
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export const useAuthDispatch = () => useContext(AuthDispatchContext);
