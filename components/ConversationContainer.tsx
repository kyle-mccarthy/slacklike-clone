import { FC, useEffect, useCallback, KeyboardEvent, useState } from 'react';
import supabase from '@app/utils/supabase';
import { Conversation, Message, Participant } from '@app/types';
import Messages from './Messages';
import ChatTextarea from './ChatTextarea';
import ConversationHeader from './ConversationHeader';

interface Props {
  conversationId?: string;
  userId: string;
  messages: Message[];
  participants: Participant[];
  onSend: (message: string) => void;
  conversation: Conversation;
}

const ConversationContainer: FC<Props> = ({
  conversationId,
  userId,
  onSend,
  messages,
  participants: participantList,
  conversation,
}) => {
  const [participants, setParticipants] = useState<Map<string, Participant>>(
    new Map()
  );

  useEffect(() => {
    setParticipants(
      [...participantList].reduce((acc, curr) => {
        acc.set(curr.user_id, curr);
        return acc;
      }, new Map())
    );
  }, [participantList, setParticipants]);

  return (
    <div className="flex flex-col min-h-full">
      <div>
        <ConversationHeader conversation={conversation} />
      </div>
      <div className="p-6 pt-0 flex-grow">
        <Messages
          conversationId={conversationId}
          messages={messages}
          participants={participants}
        />
      </div>
      <div className="p-6 h-32 flex">
        <ChatTextarea disabled={!!!conversationId} onSend={onSend} />
      </div>
    </div>
  );
};

export default ConversationContainer;
