import type { AppProps } from 'next/app';
import { FC, useRef } from 'react';
import 'tailwindcss/tailwind.css';
import { Auth } from '@supabase/ui';
import supabase from '@app/utils/supabase';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Hydrate } from 'react-query/hydration';

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  const queryClientRef = useRef<QueryClient>(new QueryClient());

  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }

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
