import { supabaseClient } from '@/lib/supabase/client';
import { useMe } from '@/repositories/users';
import { definitions } from '@/types/database';
import { User } from '@/types/domain/users';
import {
  SupabaseClient,
  Session,
  User as AuthUser,
} from '@supabase/supabase-js';
import { createContext, FC, useContext, useEffect, useState } from 'react';
import { syncMeWithAuthUserMetaData } from './syncMeWithAuthUserMetaData';

type AuthContextValue = {
  me: User | null;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextValue>({
  me: null,
  isLoading: false,
});

export const AuthProvider: FC = ({ children }) => {
  const initialSession = supabaseClient.auth.session();
  const [session, setSession] = useState<Session | null>(initialSession);
  const { data: me, error, mutate, isValidating } = useMe(session?.user?.id);
  const isLoading = (!error && session && !me) || isValidating;
  useEffect(() => {
    const { data: authListener } = supabaseClient.auth.onAuthStateChange(
      async (event, s) => {
        console.log('auth.onAuthStateChange', event, s);
        setSession(s);

        // for server side auth
        console.log(
          await fetch('/api/auth', {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            credentials: 'same-origin',
            body: JSON.stringify({ event, session: s }),
          }).then((res) => res.json())
        );
      }
    );
    if (session) {
      const authenticateForServer = async () => {
        console.log(
          await fetch('/api/auth', {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            credentials: 'same-origin',
            body: JSON.stringify({ event: 'SIGNED_IN', session }),
          }).then((res) => res.json())
        );
      };
      authenticateForServer();
    }

    return () => {
      if (authListener) {
        authListener.unsubscribe();
      }
    };
  }, []);
  console.log('AuthProvider', session, me, isLoading, error);

  useEffect(() => {
    console.log('useEffect, session');
  }, []);

  useEffect(() => {
    // if (session?.user && me) {
    //   syncMeWithAuthUserMetaData(session.user, me, mutate);
    // }
  }, [me, session]);

  return (
    <AuthContext.Provider value={{ isLoading, me: me ?? null }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
