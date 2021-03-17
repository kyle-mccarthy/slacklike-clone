import { Conversation } from '@app/types';
import { FC, useEffect, useRef } from 'react';
import { HiHashtag } from 'react-icons/hi';
import Modal, { useModal } from './Modal';
import SetConversationTopic from './SetConversationTopic';

interface Props {
  conversation: Conversation;
  setConversationTopic: (v: string) => void;
}

const ConversationHeader: FC<Props> = ({
  conversation,
  setConversationTopic,
}) => {
  const { isOpen, onClose, onOpen } = useModal();

  const ref = useRef(isOpen);
  ref.current = isOpen;

  const subject = conversation?.subject || 'Set a topic';

  // when the subject changes, check if the modal is open, if so close it
  useEffect(() => {
    if (ref.current) {
      onClose();
    }
  }, [subject, onClose]);

  return (
    <>
      <div className="h-16 flex items-center border-b border-white border-opacity-10">
        <div className="pr-6 pl-6">
          <div>
            <HiHashtag className="inline" />
            &nbsp;{conversation?.name}
          </div>
          <div
            className="text-xs cursor-pointer hover:text-gray-300 transition-colors"
            onClick={onOpen}
          >
            {subject}
          </div>
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <SetConversationTopic
          setConversationTopic={setConversationTopic}
          topic={conversation?.subject}
        />
      </Modal>
    </>
  );
};

export default ConversationHeader;
