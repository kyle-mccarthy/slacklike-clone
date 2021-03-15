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
}) => {
  // const [messages, setMessages] = useState([]);

  return (
    <div className="flex flex-col min-h-full">
      <div className="flex-grow">
        <Messages conversationId={conversationId} />
      </div>
      <div className="h-24 flex">
        <ChatTextarea disabled={!!!conversationId} onSend={onSend} />
      </div>
    </div>
  );
};

export default ConversationContainer;
