import supabase from '@app/utils/supabase';
import { FC, useCallback, useEffect, useState } from 'react';
import ConversationContainer from './ConversationContainer';
import { Participant, Message, Conversation } from '@app/types';

interface Props {
  conversationId?: string;
  userId: string;
}

interface RawParticipant {
  user_id: string;
  conversation_id: string;
  users: { display_name: string };
}

const ConversationController: FC<Props> = ({ conversationId, userId }) => {
  const [messages, setMessages] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [conversation, setConversation] = useState<Conversation | null>(null);

  // setup the subscription and listen for new messages in the current
  // conversation
  useEffect(() => {
    let destory = () => {
      /* noop */
    };

    if (conversationId) {
      console.log('subscribing', conversationId);
      const sub = supabase
        .from(`messages:conversation_id=eq.${conversationId}`)
        .on('INSERT', (payload) => {
          setMessages((prev) => {
            return [...prev, payload.new];
          });
        })
        .subscribe();

      const convoSub = supabase
        .from(`conversations:id=eq.${conversationId}`)
        .on('UPDATE', (payload) => {
          setConversation(payload.new);
        })
        .subscribe();

      destory = () => {
        console.log('unsubbing');
        sub.unsubscribe();
        convoSub.unsubscribe();
      };
    }

    return () => {
      destory();
    };
  }, [conversationId, setMessages, setConversation]);

  // for the current conversation, get the previous 100 messages as well as the
  // current participants
  useEffect(() => {
    if (conversationId) {
      supabase
        .from(`messages`)
        .select()
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: false })
        .limit(100)
        .then((res) => {
          const data: Message[] = res.data;
          if (Array.isArray(data)) {
            setMessages(data.reverse());
          }
        });

      supabase
        .from('participants')
        .select('conversation_id, user_id, users(display_name)')
        .eq('conversation_id', conversationId)
        .then((res) => {
          const rawParticipants: RawParticipant[] = res.data;
          const data: Participant[] = rawParticipants.map((r) => ({
            user_id: r.user_id,
            conversation_id: r.conversation_id,
            display_name: r.users.display_name,
          }));
          setParticipants(data);
        });

      supabase
        .from('conversations')
        .select()
        .eq('id', conversationId)
        .then((res) => {
          const data = res.data;
          if (Array.isArray(data) && data.length > 0) {
            setConversation(data[0]);
          }
        });
    }
  }, [conversationId, setMessages, setParticipants, setConversation]);

  // handle sending a new message for the current user and conversation, _don't_
  // automatically append the message -- our subscription will handle this for
  // us
  const handleSend = useCallback(
    (message: string) => {
      supabase
        .from('messages')
        .insert(
          [
            {
              conversation_id: conversationId,
              user_id: userId,
              content: message,
            },
          ],
          { returning: 'minimal' }
        )
        .then((res) => {
          const { error } = res;
          if (error) {
            console.error(error);
          }
        });
    },
    [conversationId, userId]
  );

  const setConversationTopic = useCallback(
    async (topic: string) => {
      // we are subscribed to this so we can throw the promise away, however it
      // appears that supabase uses a "promise like" value, and it doesn't do
      // anything unless awaited
      supabase
        .from('conversations')
        .update({ subject: topic })
        .match({ id: conversationId })
        .then((_) => {});
    },
    [conversationId]
  );

  return (
    <ConversationContainer
      userId={userId}
      conversationId={conversationId}
      messages={messages}
      onSend={handleSend}
      participants={participants}
      conversation={conversation}
      setConversationTopic={setConversationTopic}
    />
  );
};

export default ConversationController;
