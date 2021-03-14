import supabase from '@app/utils/supabase';
import type { ApiHandler } from '@app/types';

const handle: ApiHandler = async (req, res) => {
  supabase.auth.api.setAuthCookie(req, res);
};

export default handle;
