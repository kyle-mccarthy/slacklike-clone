import { ApiHandler } from '@app/types';
import supabase from '@app/utils/supabase';

const handle: ApiHandler = async (req, res) => {
  if (req.method !== 'GET') {
    return res
      .status(405)
      .json({ error: 'Method Not Allowed', message: 'Expected GET request' });
  }

  const token = req.headers.token;

  if (typeof token !== 'string') {
    return res.status(400).json({
      error: 'token contains unexpected value',
      message: 'The token header must contain a string value',
    });
  }

  const { data, error } = await supabase.auth.api.getUser(token);

  if (error) {
    return res.status(401).json({ error: error.message });
  }

  return res.status(200).json({ user: data });
};

export default handle;
