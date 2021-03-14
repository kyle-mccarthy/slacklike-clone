import { useQuery } from 'react-query';

const fetchCurrentUser = async (token: string) => {
  const res = await fetch('/api/me', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      token,
    },
    credentials: 'same-origin',
  });

  const body = await res.json();

  return body;
};

export const useCurrentUser = (token?: string) => {
  return useQuery(['user', token], () => fetchCurrentUser(token), {
    enabled: !!token,
  });
};
