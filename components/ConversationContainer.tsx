import { Conversation, Message, Participant } from '@app/types';
import { FC, useEffect, useState } from 'react';
import ChatTextarea from './ChatTextarea';
import ConversationHeader from './ConversationHeader';
import Messages from './Messages';

interface Props {
  conversationId?: string;
  userId: string;
  messages: Message[];
  participants: Participant[];
  onSend: (message: string) => void;
  conversation: Conversation;
  setConversationTopic: (topic: string) => void;
}

const ConversationContainer: FC<Props> = ({
  conversationId,
  userId,
  onSend,
  messages,
  participants: participantList,
  conversation,
  setConversationTopic,
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
    <div className="flex flex-col min-h-full max-h-full">
      <div className="h-16 mb-4">
        <ConversationHeader
          conversation={conversation}
          setConversationTopic={setConversationTopic}
        />
      </div>
      <div className="flex-grow flex flex-col">
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
