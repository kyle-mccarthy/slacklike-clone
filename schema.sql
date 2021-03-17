--
-- SCHEMA
-- This is intended to be used with supabase
--

-- tear down the existing public tables if they exist
DROP TABLE IF EXISTS public.messages;
DROP TABLE IF EXISTS public.participants;
DROP TABLE IF EXISTS public.conversations;
DROP TABLE IF EXISTS public.users;

--
-- Create tables
--
CREATE TABLE public.users (
  id                UUID REFERENCES auth.users NOT NULL,
  display_name      TEXT,
  PRIMARY KEY(id)
);

CREATE TABLE public.conversations (
  id          UUID default gen_random_uuid() PRIMARY KEY,
  name        TEXT,
  subject     TEXT default NULL,
  user_id     UUID REFERENCES public.users NOT NULL
);

CREATE TABLE public.participants (
  conversation_id   UUID REFERENCES public.conversations NOT NULL,
  user_id           UUID REFERENCES public.users NOT NULL,
  PRIMARY KEY (conversation_id, user_id)
);

CREATE TABLE public.messages (
  id                UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id           UUID REFERENCES auth.users NOT NULL,
  conversation_id   UUID REFERENCES public.conversations NOT NULL,
  created_at        timestamptz default NOW(),
  content           TEXT
);

-- set the table policies
create policy "Allow individual insert access" on public.messages for insert with check ( auth.uid() = user_id );
create policy "Allow individual update access" on public.messages for update using ( auth.uid() = user_id );

alter table public.conversations replica identity full; 
alter table public.messages replica identity full;

--
-- FUNCTIONS, PROCEDURES, AND TRIGGERS
--
DROP FUNCTION IF EXISTS public.user_conversations;

CREATE OR REPLACE FUNCTION public.user_conversations(target_user_id UUID)
 RETURNS TABLE(id uuid, name text, subject text, is_owner boolean)
LANGUAGE SQL
AS $$
SELECT 
  conversations.id, conversations.name, conversations.subject, 
  CASE WHEN conversations.user_id = target_user_id THEN true ELSE false END as is_owner
FROM conversations 
INNER JOIN participants ON conversations.id = participants.conversation_id AND participants.user_id = target_user_id
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user;

-- inserts a row into public.users
CREATE OR REPLACE FUNCTION public.handle_new_user() 
returns trigger as $$
BEGIN
  INSERT into public.users (id, display_name)
  VALUES (new.id, new.email);
  INSERT INTO public.participants (user_id, conversation_id) SELECT new.id, id FROM public.conversations;
  return new;
END;
$$ language plpgsql security definer;

-- trigger the function every time a user is created
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

DROP TRIGGER IF EXISTS on_conversation_created ON public.conversations;
DROP FUNCTION IF EXISTS public.handle_new_conversation;

CREATE OR REPLACE FUNCTION public.handle_new_conversation()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.participants (user_id, conversation_id) SELECT id, new.id FROM public.users;
  return new;
END;
$$ language plpgsql security definer;

CREATE TRIGGER on_conversation_created
  AFTER INSERT ON public.conversations
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_conversation();

-- automatically insert any users already in the auth.users table into our users table
INSERT INTO public.users (id, display_name) SELECT id, email FROM auth.users;
-- create an initial conversation, the first user in the users table is used, this would change
-- if the application were more complex
INSERT INTO public.conversations (user_id, name) SELECT id, 'Public' FROM public.users LIMIT 1;
