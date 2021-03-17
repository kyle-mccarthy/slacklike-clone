import Container from '@app/components/Container';
import supabase from '@app/utils/supabase';
import { Auth } from '@supabase/ui';
import { NextPage } from 'next';
import Head from 'next/head';
import { useEffect } from 'react';
import { useQuery } from 'react-query';

const Page: NextPage = () => {
  return (
    <Container>
      <Head>
        <title>Login</title>
      </Head>

      <div className="w-3/5 mx-auto my-auto">
        <Auth supabaseClient={supabase} />
      </div>
    </Container>
  );
};

export default Page;
