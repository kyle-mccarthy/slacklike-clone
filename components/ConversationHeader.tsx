import { Conversation } from '@app/types';
import { FC } from 'react';
import { HiHashtag } from 'react-icons/hi';

interface Props {
  conversation: Conversation;
}

const ConversationHeader: FC<Props> = ({ conversation }) => {
  return (
    <div className="h-16 flex items-center border-b border-white border-opacity-10 mb-4">
      <div className="pr-6 pl-6">
        <div>
          <HiHashtag className="inline" />
          &nbsp; {conversation?.name}
        </div>
      </div>
    </div>
  );
};

export default ConversationHeader;
