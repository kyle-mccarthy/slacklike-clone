import Head from 'next/head';
import { NextPage } from 'next';
import { Auth } from '@supabase/ui';
import { useCurrentUser } from '@app/utils/queries/user';
import ChatContainer from '@app/components/ChatContainer';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import supabase from '@app/utils/supabase';

const Page: NextPage = () => {
  const { session } = Auth.useUser();
  const { data, error, ...rest } = useCurrentUser(session?.access_token);

  return (
    <div className="container mx-auto max-w-screen-xl">
      <Head>
        <title>Chat</title>
      </Head>

      <ChatContainer authenticatedUserId={data?.id} />
    </div>
  );
};

export default Page;
