import supabase from '@app/utils/supabase';
import { FC, useCallback, useEffect, useState } from 'react';
import ConversationContainer from './ConversationContainer';

interface Props {
  conversationId?: string;
  userId: string;
}

const ConversationController: FC<Props> = ({ conversationId, userId }) => {
  const [messages, setMessages] = useState([]);
  const [participants, setParticipants] = useState([]);

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

  useEffect(() => {
    if (conversationId) {
      supabase
        .from(`messages`)
        .select()
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: false })
        .limit(100)
        .then((res) => {
          console.log('messages', res);
        });

      supabase
        .from('participants')
        .select('conversation_id, user_id, users(display_name)')
        .eq('conversation_id', conversationId)
        .then((res) => {
          console.log('participants', res);
        });
    }
  }, [conversationId, setMessages]);

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
          console.log(res);
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
