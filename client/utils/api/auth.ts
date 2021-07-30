import { fetcher } from '../fetcher';
import { AuthType } from 'interfaces';

export const auth = (
  authType: AuthType,
  body: { email: string; by: 'email' | 'google'; image?: string },
) => fetcher('post', `/auth/${authType}`, body);
