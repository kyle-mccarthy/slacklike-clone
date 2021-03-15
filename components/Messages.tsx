import { FC, useEffect } from 'react';
import supabase from '@app/utils/supabase';
import { Conversation } from '@app/types';

interface Props {
  conversationId?: string;
}

const Messages: FC<Props> = ({ conversationId }) => {
  useEffect(() => {}, []);

  return <div>current convo = {conversationId}</div>;
};

export default Messages;
