import { FC, useEffect, useState } from 'react';
import supabase from '@app/utils/supabase';
import ConversationList from './ConversationList';
import ConversationController from './ConversationController';

interface Conversation {
  id: string;
  name: string;
  subject?: string;
  user_id: string;
}

interface Props {
  authenticatedUserId: string;
}

const ChatContainer: FC<Props> = ({ authenticatedUserId }) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [conversation, setConversation] = useState<null | string>(null);

  useEffect(() => {
    let unmounted = false;

    if (authenticatedUserId) {
      supabase
        .rpc('user_conversations', { target_user_id: authenticatedUserId })
        .then((payload) => {
          if (!unmounted) {
            setConversations(payload.data);
          }
        });
    }

    return () => {
      unmounted = true;
    };
  }, [authenticatedUserId, setConversations]);

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
    <div className="flex my-auto min-h-screen max-h-screen max-w-screen-xl">
      <div className="bg-gray-900 bg-opacity-50 w-1/4">
        <div>
          {Array.isArray(conversations) && (
            <ConversationList
              conversations={conversations}
              setConversation={setConversation}
            />
          )}
        </div>
      </div>
      <div className="bg-gray-900 bg-opacity-25 w-3/4">
        <ConversationController
          conversationId={conversation}
          userId={authenticatedUserId}
        />
      </div>
    </div>
  );
};

export default ChatContainer;
