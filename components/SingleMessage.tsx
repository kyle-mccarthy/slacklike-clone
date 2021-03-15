import { Message, Participant } from '@app/types';
import { FC, useMemo } from 'react';
import { format, parseISO } from 'date-fns';

interface Props {
  participant: Participant;
  message: Message;
}

const SingleMessage: FC<Props> = ({ message, participant }) => {
  const rawDate = message.created_at;
  const date = useMemo(() => {
    return format(parseISO(rawDate), 'p');
  }, [rawDate]);

  return (
    <div className="mb-2">
      <div className="text-xs">
        <span className="font-bold">{participant?.display_name}</span>
        &nbsp;
        <span>{date}</span>
      </div>
      <div>{message.content}</div>
    </div>
  );
};

export default SingleMessage;
