import { User } from '@app/types';
import { useQuery, UseQueryResult } from 'react-query';
import { NotAuthenticatedError, HttpError } from './common';

const fetchCurrentUser = async (token: string) => {
  const res = await fetch('/api/me', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      token,
    },
    credentials: 'same-origin',
  });

  if (res.status >= 400) {
    if (res.status === 401) {
      throw new NotAuthenticatedError(res.statusText);
    }
    throw new HttpError(res.status, res.statusText);
  }

  const body = await res.json();

  return body.user;
};

export const useCurrentUser = (token?: string): UseQueryResult<User> => {
  return useQuery(['user', token], () => fetchCurrentUser(token), {
    enabled: !!token,
  });
};
