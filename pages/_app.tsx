import type { AppProps } from 'next/app';
import { FC, useEffect, useRef } from 'react';
import 'tailwindcss/tailwind.css';
import { Auth } from '@supabase/ui';
import supabase from '@app/utils/supabase';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Hydrate } from 'react-query/hydration';
import { useRouter } from 'next/router';

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter();
  const goTo = router.push;
  const route = router.route;

  const queryClientRef = useRef<QueryClient>(new QueryClient());

  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }

  // redirect to the login if the session doesn't exist
  useEffect(() => {
    const session = supabase.auth.session();

    if (!session && route !== '/auth/login') {
      void goTo('/auth/login');
    } else if (session && route !== '/') {
      void goTo('/');
    }
  }, [goTo, route]);

  return (
    <QueryClientProvider client={queryClientRef.current}>
      <Hydrate state={pageProps.dehydratedState}>
        <Auth.UserContextProvider supabaseClient={supabase}>
          <Component {...pageProps} />
        </Auth.UserContextProvider>
      </Hydrate>
    </QueryClientProvider>
  );
};

export default MyApp;
