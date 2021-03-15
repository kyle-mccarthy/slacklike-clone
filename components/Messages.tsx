import { FC, useEffect } from 'react';
import supabase from '@app/utils/supabase';
import { Conversation, Message, Participant } from '@app/types';
import { List, AutoSizer } from 'react-virtualized';
import SingleMessage from './SingleMessage';

interface Props {
  conversationId?: string;
  participants: Map<string, Participant>;
  messages: Message[];
}

const Messages: FC<Props> = ({ conversationId, messages, participants }) => {
  useEffect(() => {}, []);

  return (
    <div>
      {messages.map((m) => (
        <SingleMessage
          key={m.id}
          message={m}
          participant={participants.get(m.user_id)}
        />
      ))}
    </div>
  );
};

export default Messages;
