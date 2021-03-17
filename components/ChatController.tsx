import { FC, useCallback, useEffect, useState } from 'react';
import supabase from '@app/utils/supabase';
import ChatContainer from './ChatContainer';
import { useRouter } from 'next/router';

interface Conversation {
  id: string;
  name: string;
  subject?: string;
  user_id: string;
}

interface Props {
  authenticatedUserId: string;
}

const ChatController: FC<Props> = ({ authenticatedUserId }) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [conversation, setConversation] = useState<null | string>(null);
  const router = useRouter();
  const goTo = router.push;

  const createConversation = useCallback(
    (name: string) => {
      console.log('will create conversation', name, authenticatedUserId);

      supabase
        .from('conversations')
        .insert({
          name,
          user_id: authenticatedUserId,
        })
        .then((res) => {
          const data: Conversation[] = res.data;
          if (Array.isArray(data) && data.length > 0) {
            const goToId = data[0].id;
            setConversation(goToId);
          }
        });
    },
    [authenticatedUserId, setConversations]
  );

  const logout = useCallback(() => {
    supabase.auth.signOut().then(() => {
      void goTo('/auth/login');
    });
  }, [goTo]);

  useEffect(() => {
    let destroyed = false;

    if (authenticatedUserId) {
      supabase
        .rpc('user_conversations', { target_user_id: authenticatedUserId })
        .then((payload) => {
          if (!destroyed) {
            setConversations(payload.data);
          }
        });
    }

    return () => {
      destroyed = true;
    };
  }, [authenticatedUserId, setConversations]);

  useEffect(() => {
    console.log('subbing to insert on conversation');
    let destory = () => {
      /* noop */
    };

    if (authenticatedUserId) {
      const sub = supabase
        .from('conversations')
        .on('INSERT', (ev) => {
          console.log('on new conversation', ev);
          const newConvo = ev.new;
          setConversations((prev) => [...prev, newConvo]);
        })
        .subscribe();

      destory = () => {
        sub.unsubscribe();
      };
    }

    return () => {
      destory();
    };
  }, [setConversations]);

  useEffect(() => {
    if (
      conversation === null &&
      Array.isArray(conversations) &&
      conversations.length > 0
    ) {
      setConversation(conversations[0]?.id);
    }
  }, [conversation, conversations, setConversation]);

  return (
    <ChatContainer
      authenticatedUserId={authenticatedUserId}
      conversations={conversations}
      setConversations={setConversations}
      conversation={conversation}
      setConversation={setConversation}
      createConversation={createConversation}
      logout={logout}
    />
  );
};

export default ChatController;
