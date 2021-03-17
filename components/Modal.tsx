import { FC, useState, useCallback } from 'react';
import { Portal } from 'react-portal';

export const useModal = (isOpen?: boolean) => {
  const [state, setState] = useState(!!isOpen);

  const onOpen = useCallback(() => {
    setState(true);
  }, [setState]);

  const onClose = useCallback(() => {
    setState(false);
  }, [setState]);

  return {
    isOpen: state,
    onOpen,
    onClose,
  };
};

interface Props {
  isOpen?: boolean;
  onClose: () => void;
}

const Modal: FC<Props> = ({ isOpen, children }) => {
  return (
    isOpen && (
      <Portal>
        <div
          style={{
            width: 400,
            position: 'fixed',
            top: '30%',
            left: '50%',
            transform: 'translate(-50%, 0)',
          }}
          className="bg-gray-700 shadow-md"
        >
          <div className="p-6">{children}</div>
        </div>
      </Portal>
    )
  );
};

export default Modal;
