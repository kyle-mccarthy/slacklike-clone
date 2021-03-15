import supabase from '@app/utils/supabase';
import { FC, useCallback, useEffect, useState } from 'react';
import ConversationContainer from './ConversationContainer';
import { Participant, Message } from '@app/types';

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

  // setup the subscription and listen for new messages in the current
  // conversation
  useEffect(() => {
    let destory = () => {
      /* noop */
    };

    if (conversationId) {
      const sub = supabase
        .from(`messages:conversation_id=eq.${conversationId}`)
        .on('INSERT', (payload) => {
          setMessages((prev) => {
            return [...prev, payload.new];
          });
        })
        .subscribe();

      destory = () => {
        sub.unsubscribe();
      };
    }

    return () => {
      destory();
    };
  }, [conversationId]);

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
          setMessages(data);
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
    }
  }, [conversationId, setMessages, setParticipants]);

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

  return (
    <ConversationContainer
      userId={userId}
      conversationId={conversationId}
      messages={messages}
      onSend={handleSend}
      participants={participants}
    />
  );
};

export default ConversationController;
