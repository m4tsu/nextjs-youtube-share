import { supabaseClient } from '@/lib/supabase/client';
import { useCallback, useState } from 'react';

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  // supabaseClient.auth.signUp({provider})
  const login = useCallback(async () => {
    try {
      setIsLoading(true);
      const { error } = await supabaseClient.auth.signIn({
        email: 'tyomailati@gmail.com',
      });
      if (error) throw error;
      alert('Check your email for the login link!');
    } catch (error) {
      console.error('login error', error);
      // alert(error.error_description || error.message)
    } finally {
      setIsLoading(false);
    }
  }, [supabaseClient]);

  const logout = useCallback(async () => {
    try {
      setIsLoading(true);
      const { error } = await supabaseClient.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error(error);
      // alert(error.error_description || error.message)
    } finally {
      setIsLoading(false);
    }
  }, [supabaseClient]);

  return { login, logout };
};
