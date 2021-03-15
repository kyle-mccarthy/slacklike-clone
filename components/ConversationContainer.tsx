import { FC, useEffect, useCallback, KeyboardEvent, useState } from 'react';
import supabase from '@app/utils/supabase';
import { Conversation, Message, Participant } from '@app/types';
import Messages from './Messages';
import ChatTextarea from './ChatTextarea';

interface Props {
  conversationId?: string;
  userId: string;
  messages: Message[];
  participants: Participant[];
  onSend: (message: string) => void;
}

const ConversationContainer: FC<Props> = ({
  conversationId,
  userId,
  onSend,
  messages,
  participants: participantList,
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
      <div className="flex-grow">
        <Messages
          conversationId={conversationId}
          messages={messages}
          participants={participants}
        />
      </div>
      <div className="h-24 flex">
        <ChatTextarea disabled={!!!conversationId} onSend={onSend} />
      </div>
    </div>
  );
};

export default ConversationContainer;
