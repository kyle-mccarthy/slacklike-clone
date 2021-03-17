import { FC, useCallback, useState, ChangeEvent, useRef } from 'react';

interface Props {
  topic?: string;
  setConversationTopic: (v: string) => void;
}

const SetConversationTopic: FC<Props> = ({ topic, setConversationTopic }) => {
  const [state, setState] = useState(topic || '');
  const ref = useRef(state);

  ref.current = state;

  const onChange = useCallback(
    (ev: ChangeEvent<HTMLInputElement>) => {
      setState(ev.target.value);
    },
    [setState]
  );

  const onSubmit = useCallback(() => {
    setConversationTopic(ref.current);
  }, [setConversationTopic, ref]);

  return (
    <div className="flex">
      <input
        className="bg-gray-900 bg-opacity-25 flex-grow p-2 border border-gray-900 border-opacity-25"
        value={state}
        onChange={onChange}
      />
      <div
        onClick={onSubmit}
        className="p-2 text-center ml-2 border border-white leading-none flex justify-center items-center hover:bg-gray-900 hover:bg-opacity-5 hover:border-opacity-50 cursor-pointer transition-all"
      >
        SET TOPIC
      </div>
    </div>
  );
};

export default SetConversationTopic;
