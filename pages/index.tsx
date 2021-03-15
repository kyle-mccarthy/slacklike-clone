import Head from 'next/head';
import { NextPage } from 'next';
import { Auth } from '@supabase/ui';
import { useCurrentUser } from '@app/utils/queries/user';
import ChatContainer from '@app/components/ChatContainer';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Page: NextPage = () => {
  const { session } = Auth.useUser();
  const { data, error, ...rest } = useCurrentUser(session?.access_token);
  const router = useRouter();

  // useEffect(() => {
  //   if (error) {
  //     void router.push('/auth/login');
  //   }
  // }, [error, router]);

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
