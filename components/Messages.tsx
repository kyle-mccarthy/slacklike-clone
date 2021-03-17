import { Message, Participant } from '@app/types';
import { FC } from 'react';
import { Virtuoso } from 'react-virtuoso';
import SingleMessage from './SingleMessage';

interface Props {
  conversationId?: string;
  participants: Map<string, Participant>;
  messages: Message[];
}

const Messages: FC<Props> = ({ messages, participants }) => {
  if (messages.length === 0) {
    return null;
  }
  return (
    <Virtuoso
      className="flex-grow"
      data={messages}
      itemContent={(_index, m) => {
        if (!m) {
          return null;
        }

        return (
          <SingleMessage
            message={m}
            participant={participants.get(m.user_id)}
          />
        );
      }}
      followOutput="smooth"
      initialTopMostItemIndex={messages.length}
    />
  );
};

export default Messages;
