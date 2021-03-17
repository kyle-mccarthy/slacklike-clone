import type { OpenGraphData } from 'open-graph-scraper';
import { useQuery, UseQueryResult } from 'react-query';
import { HttpError } from './common';

const fetchOpenGraphData = async (url: string) => {
  const res = await fetch(`/api/preview-link?url=${encodeURIComponent(url)}`, {
    method: 'GET',
  });

  if (res.status >= 400) {
    throw new HttpError(res.status, res.statusText);
  }

  const body = await res.json();

  return body.data;
};

export const useOpenGraphData = (
  url: string
): UseQueryResult<OpenGraphData> => {
  return useQuery(['opengraph-data', url], () => fetchOpenGraphData(url), {
    enabled: !!url,
  });
};
