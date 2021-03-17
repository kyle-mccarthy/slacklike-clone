import ChatController from '@app/components/ChatController';
import { useCurrentUser } from '@app/utils/queries/user';
import { Auth } from '@supabase/ui';
import { NextPage } from 'next';
import Head from 'next/head';

const Page: NextPage = () => {
  const { session } = Auth.useUser();
  const { data, error } = useCurrentUser(session?.access_token);

  return (
    <div className="container mx-auto max-w-screen-xl">
      <Head>
        <title>Chat</title>
      </Head>

      <ChatController authenticatedUserId={data?.id} />
    </div>
  );
};

export default Page;
