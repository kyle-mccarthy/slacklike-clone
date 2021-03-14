import Head from 'next/head';
import { NextPage } from 'next';
import { Auth } from '@supabase/ui';
import { useCurrentUser } from '@app/utils/queries/user';

const Page: NextPage = () => {
  const { session } = Auth.useUser();
  const { data } = useCurrentUser(session?.access_token);

  return (
    <div className="container">
      <Head>
        <title>Chat</title>
      </Head>

      <p className="font-sans">Typography</p>
    </div>
  );
};

export default Page;
