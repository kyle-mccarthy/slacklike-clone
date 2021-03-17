import { FC, useCallback, useRef, useState } from 'react';
import { FiPlusSquare } from 'react-icons/fi';
import Button from './form/Button';
import Input from './form/Input';
import Modal, { useModal } from './Modal';

interface Props {
  createConversation: (name: string) => void;
}

const CreateConversation: FC<Props> = ({ createConversation }) => {
  const [name, setName] = useState('');
  const ref = useRef(name);

  ref.current = name;

  const { isOpen, onClose, onOpen } = useModal();

  const onCreate = useCallback(() => {
    const tmp = ref.current;
    createConversation(tmp);
    onClose();
    setName('');
  }, [ref, createConversation, onClose, setName]);

  return (
    <>
      <span onClick={onOpen}>
        <FiPlusSquare className="inline" /> New Conversation
      </span>
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="flex">
          <Input value={name} onChange={setName} />
          <Button onClick={onCreate}>Create</Button>
        </div>
      </Modal>
    </>
  );
};

export default CreateConversation;
