import { ApiHandler } from '@app/types';
import og from 'open-graph-scraper';
import { re } from '@app/utils/url';

const handle: ApiHandler = async (req, res) => {
  if (req.method !== 'GET') {
    return res
      .status(405)
      .json({ error: 'Method Not Allowed', message: 'Expected GET request' });
  }

  const url = req.query.url;

  if (typeof url !== 'string' || !re.test(url)) {
    return res.status(400).json({
      error: 'Invalid query string',
      message: 'Expected query string to contain valid URL',
    });
  }

  let err: Error;
  let ogData: any;

  try {
    ogData = await og({ url });
  } catch (e) {
    err = e;
  }

  if (err) {
    return res.status(400).json({
      error: err.message,
      message: 'failed to fetch the opengraph data for the url',
    });
  }

  if (ogData.error === true || ogData.result?.success === false) {
    return res.status(400).json({
      message: 'failed to fetch the opengraph data for the url',
    });
  }

  return res.status(200).json({ data: ogData.result });
};

export default handle;
