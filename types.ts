import type { NextApiRequest, NextApiResponse } from 'next';
import type {
  User as SupabaseUser,
  Session as SupabaseSession,
} from '@supabase/supabase-js';

export type ApiHandler = (
  req: NextApiRequest,
  res: NextApiResponse<Record<string, any>>
) => Promise<void>;

export type User = SupabaseUser;
export type Session = SupabaseSession;

export interface AuthSession {
  user: User;
  session: Session;
}

export interface Conversation {
  id: string;
  name: string;
  subject?: string;
  user_id: string;
}

export interface Message {
  content: string;
  created_at: string;
  id: string;
  user_id: string;
  conversation_id: string;
}

export interface Participant {
  user_id: string;
  display_name: string;
}
