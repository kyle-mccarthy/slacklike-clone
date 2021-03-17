import { FC, useEffect } from 'react';
import supabase from '@app/utils/supabase';
import { useCurrentUser } from '@app/utils/queries/user';
import { Auth } from '@supabase/ui';
import { useRouter } from 'next/router';

const AuthController: FC = ({ children }) => {
  const { user, session } = Auth.useUser();
  const query = useCurrentUser(session?.access_token);

  const router = useRouter();
  const goTo = router.push;
  const route = router.route;

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (ev, session) => {
        const res = await fetch('/api/auth', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            event: ev,
            session,
          }),
        });

        const body = await res.json();
      }
    );

    return () => {
      listener.unsubscribe();
    };
  }, []);

  // redirect to the login if the session doesn't exist
  useEffect(() => {
    if (!session && route !== '/auth/login') {
      void goTo('/auth/login');
    } else if (session && route !== '/') {
      void goTo('/');
    }
  }, [goTo, route, session]);

  return <>{children}</>;
};

export default AuthController;
