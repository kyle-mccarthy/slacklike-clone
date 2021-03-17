import { Conversation } from '@app/types';
import { FC, useCallback, HTMLProps } from 'react';
import { HiHashtag } from 'react-icons/hi';
import CreateConversation from './CreateConversation';

// List item with the styles
const StyledListItem: FC<HTMLProps<HTMLLIElement>> = ({
  children,
  ...rest
}) => {
  return (
    <li
      className="cursor-pointer hover:text-gray-300 transition-colors"
      {...rest}
    >
      {children}
    </li>
  );
};

interface ItemProps {
  conversation: Conversation;
  setConversation: (id: string) => void;
  selected?: boolean;
}

// List item with the styles as well as the interactions for displaying the
// conversation and handling user interactions
const ListItem: FC<ItemProps> = ({ conversation, setConversation }) => {
  const id = conversation.id;

  const onClick = useCallback(() => {
    setConversation(id);
  }, [setConversation, id]);

  return (
    <StyledListItem
      className="cursor-pointer hover:text-gray-300 transition-colors"
      onClick={onClick}
    >
      <HiHashtag className="inline" /> {conversation.name}
    </StyledListItem>
  );
};

interface Props {
  conversations: Conversation[];
  setConversation: (id: string) => void;
  createConversation: (name: string) => void;
}

// Displays the conversations in a list, handles selecting conversations as well
// as creating new conversations
const ConversationList: FC<Props> = ({
  conversations,
  setConversation,
  createConversation,
}) => {
  return (
    <div>
      <div className="h-16 flex items-center border-b border-white border-opacity-10 mb-4 pr-6 pl-6">
        <h3 className="text-lg uppercase font-semibold tracking-wide text-gray-300">
          Conversations
        </h3>
      </div>
      <div className="pr-6 pl-6 pb-6">
        <ul>
          {conversations.map((c) => (
            <ListItem
              key={c.id}
              conversation={c}
              setConversation={setConversation}
            >
              {c.name}
            </ListItem>
          ))}

          <StyledListItem>
            <CreateConversation createConversation={createConversation} />
          </StyledListItem>
        </ul>
      </div>
    </div>
  );
};

export default ConversationList;
