import {
  FC,
  useCallback,
  KeyboardEvent,
  useState,
  useRef,
  ChangeEvent,
} from 'react';

interface Props {
  onSend: (message: string) => void;
  disabled?: boolean;
}

const ChatTextarea: FC<Props> = ({ onSend, disabled }) => {
  const [message, setMessage] = useState('');

  // store the current state in a ref as well, this will allow for getting the
  // current state value in memoized callbacks without recreating the memoized
  // value on the next render
  const ref = useRef(message);
  ref.current = message;

  const handleKeyDown = useCallback(
    (ev: KeyboardEvent<HTMLTextAreaElement>) => {
      if (ev.key == 'Enter' && !ev.shiftKey) {
        // when the user is pressing enter (w/o shift) we don't want to add that
        // value into the state, so preventing the default behavior is required
        ev.preventDefault();
        // only send the message if there is content
        if (ref.current.length > 0) {
          // send the current message and reset the state
          const payload = ref.current;
          onSend(payload);
          setMessage('');
        }
      }
    },
    [onSend, ref, setMessage]
  );

  const handleChange = useCallback(
    (ev: ChangeEvent<HTMLTextAreaElement>) => {
      setMessage(ev.target.value);
    },
    [setMessage]
  );

  return (
    <textarea
      className={`flex-grow bg-gray-900 bg-opacity-5 rounded ${
        disabled && 'disabled'
      }`}
      onKeyDown={handleKeyDown}
      disabled={disabled}
      value={message}
      onChange={handleChange}
    />
  );
};

export default ChatTextarea;
