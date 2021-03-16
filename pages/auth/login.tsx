import Container from '@app/components/Container';
import supabase from '@app/utils/supabase';
import { Auth } from '@supabase/ui';
import { NextPage } from 'next';
import Head from 'next/head';
import { useEffect } from 'react';
import { useQuery } from 'react-query';

const fetchCurrentUser = async (token: string) => {
  const res = await fetch('/api/me', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      token,
    },
    credentials: 'same-origin',
  });
  const body = await res.json();

  return body;
};

const useCurrentUser = (token?: string) => {
  return useQuery(['user', token], () => fetchCurrentUser(token), {
    enabled: !!token,
  });
};

const Page: NextPage = () => {
  const { user, session } = Auth.useUser();
  const query = useCurrentUser(session?.access_token);

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

        console.log(body);
      }
    );

    return () => {
      listener.unsubscribe();
    };
  }, []);

  return (
    <Container>
      <Head>
        <title>Login</title>
      </Head>

      <p className="font-sans">Typography</p>

      <div className="w-3/5 mx-auto my-auto">
        <Auth supabaseClient={supabase} />
      </div>
    </Container>
  );
};

export default Page;
