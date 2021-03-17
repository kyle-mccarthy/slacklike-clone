import { FC } from 'react';
import { HiLogout } from 'react-icons/hi';
import ConversationController from './ConversationController';
import ConversationList from './ConversationList';

interface Conversation {
  id: string;
  name: string;
  subject?: string;
  user_id: string;
}

interface Props {
  authenticatedUserId: string;
  createConversation: (name: string) => void;
  conversations: Conversation[];
  setConversations: (arr: Conversation[]) => void;
  conversation: string | null;
  setConversation: (id: string) => void;
  logout: () => void;
}

const ChatContainer: FC<Props> = ({
  authenticatedUserId,
  conversations,
  conversation,
  setConversation,
  createConversation,
  logout,
}) => {
  return (
    <div className="flex my-auto min-h-screen max-h-screen max-w-screen-xl">
      <div className="bg-gray-900 bg-opacity-50 w-1/4 flex flex-col">
        <div>
          {Array.isArray(conversations) && (
            <ConversationList
              conversations={conversations}
              setConversation={setConversation}
              createConversation={createConversation}
            />
          )}
        </div>
        <div className="mt-auto pl-6 pr-6 mb-3">
          <span className="flex items-center cursor-pointer" onClick={logout}>
            <span className="text-sm uppercase">Logout</span>{' '}
            <HiLogout className="inline ml-2" />
          </span>
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
