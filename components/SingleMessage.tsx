import { Message, Participant } from '@app/types';
import { FC, useMemo } from 'react';
import { format, parseISO } from 'date-fns';
import { re as urlRegex } from '@app/utils/url';
import PreviewLink from './PreviewLink';

interface Props {
  participant: Participant;
  message: Message;
}

const SingleMessage: FC<Props> = ({ message, participant }) => {
  const content = message.content;
  const rawDate = message.created_at;
  const date = useMemo(() => {
    return format(parseISO(rawDate), 'p');
  }, [rawDate]);

  const url = useMemo(() => {
    if (typeof content === 'string') {
      const out = content.match(urlRegex);

      if (Array.isArray(out)) {
        return out[0];
      }
    }
  }, [content]);

  return (
    <>
      <div className="pb-2 pr-6 pl-6">
        <div className="text-xs">
          <span className="font-bold">{participant?.display_name}</span>
          &nbsp;
          <span>{date}</span>
        </div>
        <div>{content}</div>
        {url && <PreviewLink url={url} />}
      </div>
    </>
  );
};

export default SingleMessage;
